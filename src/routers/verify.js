const express = require("express");
const router = new express.Router();

const { verifyOTP } = require("../functions/verifications");

router.post("/verify", async (req, res) => {
  const params = req.body;

  if (params.type === "phone") {
    const response = await verifyOTP(params, res);
    console.log(response);
  } else {
    res.status(400).send({
      error: "Invalid validation type. Accepts 'email' or 'phone' as values",
    });
  }

  //   else if (params.type === "email") {
  //     const response = await verifyOTP(params);
  //   }
});

module.exports = router;
