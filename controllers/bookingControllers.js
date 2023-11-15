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


const createBooking = async(req, res) => {
    try {
        const {
            room_id,
            check_in,
            check_out,
            info: {
                firstName,
                lastName,
                phone,
                email,
                country,
                passportType,
                passport,
                arrivalTime,
                additionalComments,
                paymentMethod,
                paymentStatus,
                price,
            },
        } = req.body;

        const newBooking = new Booking({
            info: {
                firstName,
                lastName,
                phone,
                email,
                country,
                passportType,
                passport,
                arrivalTime,
                additionalComments,
                paymentMethod,
                paymentStatus,
                price,
            },
            room_id,
            check_in,
            check_out,
        });

        const savedBooking = await newBooking.save();

        res.status(200).send({
            message: "Booking created",
            status: 200,
            savedBooking,
        });
    } catch (error) {
        res.status(500).send({
            message: "Something went wrong, try again later",
            status: 500,
            error,
        });
    }
}



module.exports = { getAllBookings, createBooking }