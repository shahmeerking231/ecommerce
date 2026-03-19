const mongoose = require("mongoose")

const connectToDatabase = () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to DB!");
  }).catch((error) => {
    console.log("An error occurred", error);
    process.exit(0);
  })
}

module.exports = connectToDatabase;