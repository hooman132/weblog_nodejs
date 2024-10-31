/*************  ✨ Codeium Command 🌟  *************/
const express = require("express");
const app = express();
const yup = require("yup");

/**
 * Validation schema for user data
 */
const users_schema_validation = yup.object({
  /**
   * Name field validation
   * - Required
   * - Minimum length of 2 characters
   * - Maximum length of 50 characters
   * - Only allows Persian and English characters, and whitespace
   * - Trims the input value
   */
  name: yup
    .string()
    .required("نام الزامی است")
    .min(2, "نام باید حداقل ۲ کاراکتر باشد")
    .max(50, "نام نمی‌تواند بیشتر از ۵۰ کاراکتر باشد")
    .matches(
      /^[\u0600-\u06FFa-zA-Z\s]+$/,
      "نام فقط می‌تواند شامل حروف فارسی، انگلیسی و فاصله باشد"
    )
    .trim(),

  /**
   * Password field validation
   * - Required
   * - Minimum length of 8 characters
   * - Must contain at least one uppercase letter, one lowercase letter, one number, and one special character
   */
  password: yup
    .string()
    .required("رمز عبور الزامی است")
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "رمز عبور باید شامل حداقل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر خاص باشد"
    ),

  /**
   * Repeat password field validation
   * - Required
   * - Must be the same as the password field
   */
  repassword: yup
    .string()
    .required("تکرار رمز عبور الزامی است")
    .oneOf([yup.ref("password")], "رمز عبور و تکرار آن باید یکسان باشند"),

  /**
   * Email field validation
   * - Required
   * - Must be a valid email address
   * - Trims the input value
   * - Converts the input value to lowercase
   */
  email: yup
    .string()
    .required("ایمیل الزامی است")
    .email("لطفاً یک ایمیل معتبر وارد کنید")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      "فرمت ایمیل نامعتبر است"
    )
    .trim()
    .lowercase(),
});

module.exports = { users_schema_validation };

/******  cf6e820c-75df-454e-9a4c-fcf9301e0b63  *******/
