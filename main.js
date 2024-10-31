const indexrouter = require("./routes/blog");
const userrouter = require("./routes/users");
const { staticServer } = require("./controller/static");
const { connect_db } = require("./controller/connectdb");
require("./controller/passport"); // اضافه کردن این خط مهمه

const port = process.env.PORT;
const URIDB = process.env.DB_MONGO;

// تنظیمات محیط و وارد کردن ماژول‌های مورد نیاز
const passport = require("passport");
const MongoStore = require("connect-mongo");
const ENV = require("dotenv").config(); // بارگذاری متغیرهای محیطی از فایل .env
var path = require("path"); // برای کار با مسیرهای فایل و دایرکتوری
const ejsLayouts = require("express-ejs-layouts"); // برای استفاده از لایه‌بندی در قالب‌های EJS
var morgan = require("morgan"); // برای ثبت درخواست‌های HTTP
var flash = require("connect-flash"); // برای ثبت درخواست‌های HTTP
var session = require("express-session"); // برای ثبت درخواست‌های HTTP
const express = require("express"); // فریمورک وب اکسپرس
const app = express(); // ایجاد یک نمونه از اپلیکیشن اکسپرس

//CONNECT_DATABASE
connect_db();
//VIEW ENGINE
app.use(ejsLayouts);

app.set("view engine", "ejs");

//STATIC
app.use(staticServer);
//BODY PARSER
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // این خط رو هم اضافه کنید

//SESIONS
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongoUrl: process.env.DB_MONGO }),
  })
);
//pasport
app.use(passport.initialize());
app.use(passport.session());
//FLASH
app.use(flash());
//ROUTES
app.use(indexrouter.Router);
app.use("/users", userrouter.users);
app.use((req, res, next) => {
  res.status(404);
  res.render("404", { pagetitle: 404, path: "/404" });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
