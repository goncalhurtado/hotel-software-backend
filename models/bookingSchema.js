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
        paymentStatus: {
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

// {
//     "info": {
//         "firstName": "Daryl",
//         "lastName": "Bullock",
//         "phone": "+1 (749) 753-6552",
//         "email": "byxazi@mailinator.com",
//         "country": "Argentina",
//         "passport": "41446888",
//         "arrivalTime": "16:30",
//         "additionalComments": "Eos nesciunt volupt",
//         "paymentMethod": "Transferencia bancaria",
//         "paymentStatus": "Pending", (Completed, Pending, Cancelled)
//         "price": "100"
//     },
//     "room_id": 18,
//     "check_in": "11/12/2023",
//     "check_out": "11/14/2023",
//     "id": 56462
// }