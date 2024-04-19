const jwt = require("jsonwebtoken");
const catchAsync = require("./../util/catchAsync");
const User = require("./../Model/userModel");
const AppError = require("./../util/AppError");
const { promisify } = require("util");

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(user._id);

  res.status(200).json({
    state: "success",
    token,
    data: {
      user,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { password, email } = req.body;

  if (!password || !email) {
    return next(new AppError("email or password fail", 404));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comarePasswords(password, user.password))) {
    return next(new AppError("invalid email or password", 400));
  }

  const token = signToken(user._id);

  res.status(200).json({
    state: "success",
    token,
    doc: {
      user,
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("you're not logged in Please log in to get access", 400)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user) return next(new AppError("invalid token", 400));

  req.user = user;
  next();
});

exports.isLoggedIn = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return next();
    }

    res.json({ state: "success", id: currentUser.id, currentUser });
  } catch (err) {
    res.status(200).json({ state: "fail", message: "invalid token" });
  }
};

exports.restrictTo = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(new AppError("you're not alowed to access this route", 400));
    }
    return next();
  };
};
