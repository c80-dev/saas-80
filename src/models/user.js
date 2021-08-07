const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
});

schema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;

  if (!userObject.phonenumber) delete userObject.verifiedPhoneNumber;

  return userObject;
};

schema.pre("save", async function (next) {
  const user = this;
  const userObject = user.toObject();

  if (user.isModified("password")) {
    userObject.password = await bcrypt.hash(user.password, 8);
  }

  if (user.isModified("phonenumber")) {
    userObject.verifiedPhoneNumber = false;
  }

  return userObject;
  next();
});

const User = mongoose.model("User", schema);

module.exports = User;
