const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("CONNECTED SUCCESSFULLY");
  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(1);
});