const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/exim2d_hr_erp', {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️ MongoDB connection warning: ${error.message}. Running in Hybrid/Memory DB Mode.`);
  }
};

module.exports = connectDB;
