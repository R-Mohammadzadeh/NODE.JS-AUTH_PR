const mongoose = require("mongoose");

/**
 * Establish connection to MongoDB
 */
const connectDB = async () => {
  try {
    // Attempt to connect using the URI from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI , {serverSelectionTimeoutMS: 5000} );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;