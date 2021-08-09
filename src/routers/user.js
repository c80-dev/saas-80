const express = require("express");
const router = new express.Router();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const User = require("../models/user");
const { sendOTP } = require("../functions/verifications");

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-w0ycluoe.us.auth0.com/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  audience: "https://sass-80-api",
  issuer: `https://dev-w0ycluoe.us.auth0.com/`,
  algorithms: ["RS256"],
});

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    if (user.phonenumber) sendOTP(user);

    res.status(201).send({ message: "User created successfully", user });
  } catch (e) {
    if (e.name === "MongoError") {
      if (e.keyValue.email) {
        return res.status(400).send({ error: "Email is already taken" });
      }

      if (e.keyValue.phonenumber) {
        return res.status(400).send({ error: "Phonenumber is already taken" });
      }
    }

    if (e.errors.name) {
      if (!req.body.name)
        return res.status(400).send({ error: "Name is required" });
      return res
        .status(400)
        .send({ error: "Invalid name: Name cannot contain a number" });
    }

    if (e.errors.email) {
      if (!req.body.email)
        return res.status(400).send({ error: "Email is required" });
      return res.status(400).send({ error: "Invalid email" });
    }

    if (e.errors.password) {
      if (!req.body.password)
        return res.status(400).send({ error: "Password is required" });
      return res.status(400).send({ error: "Invalid password" });
    }

    if (e.errors.phonenumber) {
      return res.status(400).send({ error: "Invalid phonenumber" });
    }

    res.status(500).send({ error: "User could not be created" });
  }
});

router.use(checkJwt);

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res
      .status(200)
      .send({ message: `Fetched ${users.length} record(s)`, users });
  } catch (e) {
    res.status(500).send({ error: "Could not fetch users" });
  }
});

router.post("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    res.status(200).send({ message: `User fetched successfully`, user });
  } catch (e) {
    if (e.name === "CastError")
      return res.status(404).send({ error: "User not found" });
    res.status(500).send({ error: "Could not fetch the user" });
  }
});

router.patch("/users/:id", async (req, res) => {
  const _id = req.params.id;
  const options = req.body;

  const updates = Object.keys(options);
  const allowedUpdates = ["name", "email", "password", "phonenumber"];

  const log = [];

  updates.forEach((update) => {
    if (!allowedUpdates.includes(update)) log.push(update);
  });

  const isUpdateValid = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isUpdateValid)
    return res.status(400).send({
      error: `Invalid Operation, the field '${log[0]}' cannot be updated`,
    });

  try {
    const user = await User.findById(req.params.id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    res.status(200).send({ message: "User updated successfully", user });
  } catch (e) {
    if (e.name === "CastError")
      return res.status(404).send({ error: "User not found" });

    if (e.name === "MongoError") {
      if (e.keyValue.email) {
        return res.status(400).send({ error: "Email is already taken" });
      }

      if (e.keyValue.phonenumber) {
        return res.status(400).send({ error: "Phonenumber is already taken" });
      }
    }

    if (e.errors.name) {
      return res.status(400).send({
        error:
          "Could not update user: Invalid name: Name cannot contain a number",
      });
    }

    if (e.errors.email) {
      return res
        .status(400)
        .send({ error: "Could not update user: Invalid email" });
    }

    if (e.errors.password) {
      return res
        .status(400)
        .send({ error: "Could not update user: Invalid password" });
    }

    if (e.errors.phonenumber) {
      return res
        .status(400)
        .send({ error: "Could not update user: Invalid phonenumber" });
    }

    res.status(500).send({ error: "Could not update user" });
  }
});

router.delete("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(_id);

    res.status(200).send({ message: "User deleted successfully", user });
  } catch (e) {
    if (e.name === "CastError")
      return res.status(404).send({ error: "User not found" });
    res.status(500).send({ error: "Could not delete user" });
  }
});

module.exports = router;
