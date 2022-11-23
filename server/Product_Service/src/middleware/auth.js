const User = require("../Foreign Model/user.model");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");

exports.isAuthenticUser = catchAsyncError(async (req, res, next) => {
  const token = req.headers.authorization; // check token from frontend
  console.log("token", token);

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id); // Verify token through userID

  next();
});

// accept parameter (...roles) here as admin coming from routes
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler( // will throw error if user is not admin
          `${req.user.role} are not authorized to access this resource`,
          403
        )
      );
    }
    next();
  };
};
