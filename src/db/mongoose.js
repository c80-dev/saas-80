const mongoose = require("mongoose");

require("dotenv").config();

// local-url-connection-string -- "mongodb://127.0.0.1:27017/sass-80"
// online-connection-string -- process.env.MONGODB_CONNECTION_URL

mongoose.connect(process.env.MONGODB_CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
