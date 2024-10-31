const passport = require("passport");
const bcrypt = require("bcrypt");
const { Strategy } = require("passport-local");
const { User } = require("../model/users");

passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      // جستجو کاربر بر اساس ایمیل
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: "ایمیل یا رمز عبور اشتباه است" });
      }

      // مقایسه رمز عبور
      const passwormatch = await bcrypt.compare(password, user.password);
      if (!passwormatch) {
        return done(null, false, { message: "ایمیل یا رمز عبور اشتباه است" });
      }

      // احراز هویت موفق
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// اینجا فقط id رو ذخیره می‌کنیم
passport.serializeUser((user, done) => {
  // @ts-ignore
  done(null, user);
});

// در deserialize از id استفاده می‌کنیم
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});
