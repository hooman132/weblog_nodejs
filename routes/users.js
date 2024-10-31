const express = require("express");
const users = express.Router();
const passport = require("passport");
const { User } = require("../model/users");
const { users_schema_validation } = require("../controller/uservalidation");
const bcrypt = require("bcrypt");

// routes/users.js
users.get("/login", (req, res) => {
  res.render("login", {
    pagetitle: "ورود",
    path: "/login",
    msg: req.flash("success_msg"),
    error: req.flash("error"),
  });
});
users.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Authentication error:", err);
      return next(err);
    }

    if (!user) {
      req.flash("error", info.message || "ایمیل یا رمز عبور اشتباه است");
      return res.redirect("/users/login");
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error("Login error:", err);
        return next(err);
      }

      if (req.body.remember) {
        req.session.cookie.originalMaxAge = 90000000;
      } else {
        req.session.cookie.expires = null;
      }

      req.flash("success_msg", "با موفقیت وارد شدید");
      return res.redirect("/dash");
    });
  })(req, res, next);
});
users.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err); // هندل کردن خطا (در صورت بروز مشکل)
    }
    req.flash("success_msg", "خروج موفقیت‌آمیز بود");
    res.redirect("/users/login"); // هدایت به صفحه ورود
  });
});

// صفحه ثبت نام
users.get("/register", (req, res) => {
  res.render("register", {
    pagetitle: "ثبت نام",
    path: "/register",
    errors: [],
    values: {},
  });
});

// پردازش فرم ثبت نام
users.post("/register", async (req, res) => {
  const { name, email, password, repassword } = req.body;

  try {
    // اعتبارسنجی داده‌ها
    await users_schema_validation.validate(
      { name, email, password, repassword },
      { abortEarly: false }
    );

    // بررسی وجود کاربر
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("register", {
        pagetitle: "ثبت نام",
        path: "/register",
        errors: [{ message: "ایمیل قبلاً ثبت‌نام شده است." }],
        values: { name, email },
      });
    }

    // هش کردن رمز عبور - نیازی به دو بار هش کردن نیست
    const hashedPassword = await bcrypt.hash(password, 10);

    // ایجاد کاربر جدید
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      repassword: hashedPassword, // همان رمز هش شده را استفاده می‌کنیم
    });

    await newUser.save();
    req.flash("success_msg", "ثبت نام با موفقیت انجام شد"); // اصلاح املای success
    res.redirect("/users/login");
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.render("register", {
        pagetitle: "ثبت نام",
        path: "/register",
        errors: err.errors
          ? Object.values(err.errors).map((e) => ({ message: e.message }))
          : [{ message: err.message }],
        values: { name, email },
      });
    }
    console.error(err);
    res.status(500).send("خطا در پردازش درخواست");
  }
});

// میدلور برای چک کردن احراز هویت
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "لطفا ابتدا وارد شوید");
  res.redirect("/users/login");
};

// مسیر dashboard با محافظت
users.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    pagetitle: "داشبورد",
    path: "/dashboard",
    user: req.user,
  });
});

module.exports = { users };
function next(err) {
  throw new Error("Function not implemented.");
}
