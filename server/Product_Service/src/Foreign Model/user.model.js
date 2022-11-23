//define mongodb schema here
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter your firstName"],
    maxlength: [50, "Name cannot exceed 50 characters"],
    minlength: [3, "Name must be atleast 3 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter your lastName"],
    maxlength: [50, "Name cannot exceed 50 characters"],
    minlength: [3, "Name must be atleast 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [8, "Password must be atleast 8 characters"],
    select: false,
  },
  //   avatar: {
  //     public_id: {
  //       type: String,
  //       required: false
  //     },
  //     url: {
  //       type: String,
  //       required: true
  //     }
  //   },
  role: {
    type: String,
    enum: ["admin", "vendors", "consultant"],
    required: [true, "Please enter your role"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getResetPasswordToken = async function () {
  //TODO generate reset token
  const resetToken = await crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = await crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
