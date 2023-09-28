// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

async function connectDB() {
  try {
    await mongoose.set("strictQuery", true);
    const resp = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log("connected to DB:" + resp.connections[0].name);
  } catch (error) {
    console.error("error database:", error);
    process.exit(1);
  }
}

async function closeDB() {
  try {
    await mongoose.disconnect();
    console.info("disconnected MongoDB");
  } catch (error) {
    console.error("Failed to close MongoDB connection", error);
    process.exit(1);
  }
}

module.exports = { connectDB, closeDB };
