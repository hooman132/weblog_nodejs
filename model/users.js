const mongoose = require("mongoose");
const { users_schema_validation } = require("../controller/uservalidation");

// فیلدهای Schema
const userSchemaFields = {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  repassword: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
};

// ایجاد Schema
const userSchema = new mongoose.Schema(userSchemaFields, {
  timestamps: true,
});

// متد ایستای کاربر
userSchema.statics.uservalidation = function (userData) {
  return users_schema_validation.validate(userData, { abortEarly: false });
};

// ایجاد مدل کاربر
const User = mongoose.model("User", userSchema);

// صادرات مدل
module.exports = {
  User,
};
