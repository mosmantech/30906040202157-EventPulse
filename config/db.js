const mongoose = require("mongoose");
const config = require('./config');

let isConnected = false;

const connectDB = async () => {
    if (isConnected && mongoose.connection.readyState === 1) {
        return;
    }

    try {
        const conn = await mongoose.connect(config.mongoUri);
        isConnected = conn.connections[0].readyState;
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`MongoDB Connection Error: ${err.message}`);
        throw err;
    }
};

module.exports = connectDB;