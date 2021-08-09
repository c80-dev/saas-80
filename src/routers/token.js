const express = require("express");
const router = new express.Router();
const request = require("request");

router.get("/token", async (req, res) => {
  var options = {
    method: "POST",
    url: "https://dev-w0ycluoe.us.auth0.com/oauth/token",
    headers: { "content-type": "application/json" },
    body: '{"client_id":"xemQo2xu3T4QaOUfq5A47uSKK9CU7QnJ","client_secret":"e7z5oc3YyBZV20uLvhqmvVsvmzHab3do0sLDBKoiB3lIC-ynx01Gd8RAk0LAcTp6","audience":"https://sass-80-api","grant_type":"client_credentials"}',
  };

  try {
    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      res.status(200).send({
        message: "Fetched 1 token successfully",
        ...JSON.parse(body),
      });
    });
  } catch (e) {
    res.status(500).send({ error: "Unable to fetch token" });
  }
});

module.exports = router;
