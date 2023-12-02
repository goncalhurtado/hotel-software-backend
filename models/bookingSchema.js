const mongoose = require("mongoose");
const Room = require("./roomSchema");
const Category = require("./categorySchema");




const bookingSchema = new mongoose.Schema({
    info: {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        country: {
            type: String,
            required: true,
            trim: true
        },
        passportType: {
            type: String,
            required: true,
            trim: true
        },
        passport: {
            type: String,
            required: true,
            trim: true
        },
        arrivalTime: {
            type: String,
            required: true,
            trim: true
        },
        additionalComments: {
            type: String,
            trim: true
        },
        paymentMethod: {
            type: String,
            required: true,
            trim: true,
            default: "Transfer"
        },
        paymentStatus: {
            type: String,
            required: true,
            trim: true,
            enum: ["success", "pending", "cancelled"],
            default: "pending"
        },
        price: {
            type: Number,
            required: true,
            trim: true
        }

    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Room,
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Category,
    },

    check_in: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        trim: true
    },
    check_out: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        trim: true
    },
    date: {
        type: Date,

    },
    bookingId: {
        type: String,
        trim: true
    }


});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;