const mongoose = require("mongoose");

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
            trim: true
        },
        price: {
            type: String,
            required: true,
            trim: true
        },

    },
    room_id: {
        type: Number,
        required: true,
        trim: true
    },
    check_in: {
        type: Date,
        required: true,
        trim: true
    },
    check_out: {
        type: Date,
        required: true,
        trim: true
    },

});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;