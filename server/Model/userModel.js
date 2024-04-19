const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const usersSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "tell us your'e name"],
    },
    email: {
      type: String,
      required: [true, "Please write your'r email"],
      lowercase: true,
      validate: [validator.isEmail],
      unique: [true, "thats email is already logged in"],
    },
    password: {
      type: String,
      required: [true, "Please write a password"],
      minLength: [8, "a user password must be more than 8 charactor"],
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please Confirm your'e password"],
      minLength: [8, "a user passwordConfirm must be more than 8 charactor"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "passwords are not the same",
      },
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    passwordChangedAt: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

usersSchema.methods.comarePasswords = function (
  condiatePassword,
  userpassword
) {
  return bcrypt.compare(condiatePassword, userpassword);
};

const User = mongoose.model("User", usersSchema);

module.exports = User;
