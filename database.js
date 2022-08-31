const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    prefix: {
        type: String,
        required: false,
        default: "-"
    },
    fname: {
        type: String,
        required: false,
        default: "-"
    },
    lname: {
        type: String,
        required: false,
        default: "-"
    },
    company: {
        type: String,
        required: false,
        default: "-"
    },
    position: {
        type: String,
        required: false,
        default: "-"
    },
    department: {
        type: String,
        required: false,
        default: "-"
    },
    phone: {
        type: String,
        required: true,
        index: { unique: true, dropDups: true },
        default: "-"
    },
    email: {
        type: String,
        required: false,
        default: "-"
    },
    follower: {
        type: String,
        required: false,
        default: "-"
    },
    plant: {
        type: String,
        required: false,
        default: "-"
    },
    tour: {
        type: String,
        required: false,
        default: "-"
    },
    status: {
        type: String,
        required: false,
        default: "ยังไม่มา"
    },
    created: {
        type: Date,
        required: true,
        default: Date.now,
    },
});
module.exports = mongoose.model("Test", userSchema);