const mongoose = require("mongoose");
// const validator = require("validator");

const schema = new mongoose.Schema({
  ticketId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  response: {
    type: String,
  },
});

const Analysis = mongoose.model("Tickets", schema);

module.exports = Analysis;
