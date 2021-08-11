const mongoose = require("mongoose");

require("dotenv").config();

// local-url-connection-string -- "mongodb://127.0.0.1:27017/sass-80"
// online-connection-string -- process.env.MONGODB_CONNECTION_URL

mongoose.connect("mongodb://127.0.0.1:27017/sass-80", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
