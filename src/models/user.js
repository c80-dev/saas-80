const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Enable local enironment variables
require("dotenv").config();

const twilioClient = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,

    validate(value) {
      if (!validator.isAlpha(value.replace(/ /g, ""))) {
        throw new Error("Invalid name");
      }
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is required");
      }
    },
  },
  phonenumber: {
    type: String,
    trim: true,
    unique: true,
    validate(value) {
      let number = value;

      if (number.charAt(0) === "+") {
        if (number.substring(0, 4) !== "+234")
          throw new Error("Invalid phone number");

        const arr = [0, 1, 2, 3];
        arr.forEach(() => {
          number = number.substring(1);
        });
      }

      if (!validator.isMobilePhone(number, ["en-NG"])) {
        throw new Error("Invalid phone number");
      }
    },
  },
  verifiedPhoneNumber: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  phoneVerificationChannel: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

schema.virtual("tickets", {
  ref: "Ticket",
  localField: "_id",
  foreignField: "owner",
});

schema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new Error("Incorrect Email or Password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Incorrect Email or Password");
  }

  return user;
};

schema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign(
    { _id: user._id.toString() },
    "sass-80-qwertyuioplkjhgfdsazxcvbnm"
  );

  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

schema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  if (!userObject.phonenumber) delete userObject.verifiedPhoneNumber;

  return userObject;
};

schema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", schema);

module.exports = User;
