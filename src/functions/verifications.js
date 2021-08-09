const User = require("../models/user");

// Enable local enironment variables
require("dotenv").config();

const twilioClient = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendOTP = async (user) => {
  await twilioClient.verify
    .services(process.env.TWILIO_SERVICE_SID)
    .verifications.create({
      to: `+234${user.phonenumber}`,
      channel: "sms",
    })
    .then(async () => {
      const data = await User.findById(user._id);
      data.verifiedPhoneNumber = false;
      await data.save();
    })
    .catch((e) => {
      console.log(e);
    });
};

const verifyOTP = async (params, res) => {
  try {
    const user = await User.findById(params.userId);

    if (!user) {
      res.status(404).send({ error: "User not found" });
      return;
    }

    if (user.verifiedPhoneNumber) {
      res
        .status(405)
        .send({ error: "This phone number has already been verified" });
      return;
    }

    const response = await twilioClient.verify
      .services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: `+234${user.phonenumber}`,
        code: params.code,
      });

    if (response.status === "approved") {
      user.verifiedPhoneNumber = true;
      user.save();

      res.status(200).send({ message: "Phone number has been verified" });
    }
  } catch (error) {
    if (error.name === "CastError")
      return res.status(400).send({ error: "Invalid User Id" });

    res.status(500).send({ error });
  }

  return response;
};

const verification = { sendOTP, verifyOTP };

module.exports = verification;
