const mongoose = require("mongoose");
const validator = require("validator");

const schema = new mongoose.Schema({
  filePath: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  files: {
    type: Array,
    default: [],
  },
  transactionId: {
    type: String,
    required: true,
  },
});

const Analysis = mongoose.model("Analysis", schema);

module.exports = Analysis;
