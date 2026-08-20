const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "Email is required"],
        match: [/\S+@\S+\.\S+/, "Invalid email. Please try again."],
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ['attendee', 'admin'],
        default: 'attendee'
    }

},
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);