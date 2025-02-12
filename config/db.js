const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL); // No need for additional options
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('Database Connection Failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
