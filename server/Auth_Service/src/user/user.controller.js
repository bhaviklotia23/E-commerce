const User = require("./user.model");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const crypto = require("crypto");
const sendToken = require("../utils/jwtToken");
// const sendEmail = require("../utils/sendEmail");
const {
  registerUserService,
  forgotPasswordService,
  loginUserService,
  updateUserProfile
} = require("./user.service");

// Register User Controller ----------------------------------------->>

exports.registerUser = catchAsyncError(async (req, res) => {
  const userData = await registerUserService(req.body);
  sendToken(userData, 201, res);
});

// Login User Controller    ----------------------------------------->>

exports.loginUser = catchAsyncError(async (req, res) => {
  const userData = await loginUserService(req.body);
  sendToken(userData, 200, res);
});

// Logout User Controller   ----------------------------------------->>

exports.logout = catchAsyncError(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()), // Expires token immediately
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: "logged out successfully"
  });
});

// Forgot Password Controller --------------------------------------------->>

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await forgotPasswordService(req.body.email, req.protocol);
  next();
  try {
    res.status(200).json({
      success: true,
      message: `email sent to ${user.email} successfully`
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Get User Own Profile Controller ------------------------------------------->>

exports.getUserDetails = catchAsyncError(async (req, res) => {
  const user = await User.findById(req.user.id); // Will search from its own Id with the help of token and isAuthenticate Middleware

  res.status(200).json({
    status: true,
    user
  });
});

// Update Profile Controller ------------------------------------------------->>

exports.updateProfile = catchAsyncError(async (req, res) => {
  await updateUserProfile(req.user.id, req.body);
  res.status(200).json({
    success: true
  });
});

// Reset Password API -------------------------------------------------->>

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = await crypto
    .createHash("sha256") // encode password
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    // will take two parameters, resetPassword token generated from forgot pass and expiration of token.
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return next(
      new ErrorHandler("password reset token is invalid or has expired", 400)
    );
  }

  if (!req.body.password) {
    return next(new ErrorHandler("please provide password", 400));
  }
  if (!req.body.confirmPassword) {
    return next(new ErrorHandler("please provide confirm password", 400));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("password and confirm password does not match", 400)
    );
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  const userData = JSON.parse(JSON.stringify(user));
  delete userData.password;
  delete userData.role;
  sendToken(userData, 200, res);
});

// Change or Update Password ---------------------------------------------->>

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatch = await user.comparePassword(req.body.oldPassword); // method from modal to check old password

  if (!isPasswordMatch) {
    return next(new ErrorHandler("old password is incorrect", 400));
  }

  // new password and confirm password as body data
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.newPassword; // Assign new password key's value to password key's value

  await user.save();
  const userData = JSON.parse(JSON.stringify(user));
  delete userData.password;
  delete userData.role;
  sendToken(userData, 200, res);
});
