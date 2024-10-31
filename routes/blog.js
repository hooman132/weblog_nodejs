const express = require("express");
const Router = express.Router();
//INDEX PAGE
Router.get("/", (req, res) => {
  res.render("index", { pagetitle: "وبلاگ", path: "/" });
});
Router.get(
  "/dash",
  (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    }
    res.redirect("/404");
  },
  (req, res) => {
    res.render("dashbord", { pagetitle: "وبلاگ", path: "/" });
  }
);
module.exports = { Router };
