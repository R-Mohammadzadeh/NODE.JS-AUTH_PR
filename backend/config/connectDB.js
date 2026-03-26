const mongoose = require("mongoose");

/**
 * Establish connection to MongoDB
 */
const connectDB = async () => {
  try {
 if(mongoose.connection.readyState >= 1) return ;
 const conn = await mongoose.connect(process.env.MONGO_URI , {
  serverSelectionTimeoutMS : 10000 , connectTimeoutMS : 10000 ,
 })
 console.log(`MongoDB Connected :${conn.connection.host} `);
 
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Exit process with failure
   throw error
  }
};

module.exports = connectDB;