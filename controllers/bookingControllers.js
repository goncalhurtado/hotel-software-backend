const Booking = require("../models/bookingSchema");

const getAllBookings = async(req, res) => {
    Booking.find().then((bookings) => {
        if (bookings.length === 0) {
            return res.status(404).send({
                message: "There are no bookings",
                status: 404,
            });
        }

        res.status(200).send({
            message: "All bookings",
            status: 200,
            bookings,
        });

    }).catch((error) =>
        res.status(500).send({
            message: "Something went wrong, try again later",
            status: 500,
            error,
        })
    );

}

module.exports = { getAllBookings }