

const mongoose = require("mongoose");
const conf = require("../config/config");

const connectDB = async () => {
  const connect = async (retries = 5, delay = 5000) => {
    try {
      await mongoose.connect(conf.mongoUri);
      console.log("MongoDB connected");
    } catch (error) {
      console.error(`MongoDB connection failed: ${error.message}`);

      if (retries === 0) {
        console.error("Out of retries. Exiting...");
        process.exit(1);
      }

      console.log(`Retrying in ${delay / 1000}s... (${retries} retries left)`);
      setTimeout(() => connect(retries - 1, delay), delay);
    }
  };

  connect();
};

// Graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed due to app termination");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed due to SIGTERM");
  process.exit(0);
});

module.exports = connectDB;
