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
  category: {
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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Ticket = mongoose.model("Ticket", schema);

module.exports = Ticket;
