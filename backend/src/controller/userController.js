const userModel = require("../Models/userModel");
const fileModel = require("../Models/fileModel");
const ErrorHandler = require("../config/errorHandler");
const catchAsyncError = require("../config/catchAsyncError");

exports.register = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return next(new ErrorHandler("Please enter all the fields", 400));
  }

  let user = await userModel.findOne({ email });
  if (user)
    return next(new ErrorHandler("User already exists with this email", 400));

  user = await userModel.create({
    firstName,
    lastName,
    email,
    password,
  });

  await user.save();
  res.status(200).json({
    success: true,
    user,
    message: "User added successfully",
  });
});

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please enter your email and password", 400));

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched)
    return next(new ErrorHandler("Invalid email or password!", 401));

  user.password = undefined;
  const token = user.getJWTToken();
  res.status(200).json({
    success: true,
    user,
    token,
    message: "User logged-in successfully",
  });
});

exports.uploadedFile = catchAsyncError(async (req, res, next) => {
  let { fileName, userName } = req.body;

  let file = await fileModel.find({ fileName });
  if (file.length > 0) return next(new ErrorHandler("File already exits", 400));

  if (!fileName || !userName)
    return next(
      new ErrorHandler("File is uploaded but cant be retrieved", 400),
    );

  file = await fileModel.create({
    fileName,
    userName,
  });

  res.status(200).json({
    success: true,
    file,
    message: "File uploaded successfully",
  });
});
