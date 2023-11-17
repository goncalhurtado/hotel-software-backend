const Booking = require("../models/bookingSchema");
const mongoose = require("mongoose");

const getAllBookings = async(req, res) => {
    const bookings = await Booking.find().populate('room');
    try {

        if (!bookings || bookings.length === 0) return res.status(400).send({
            message: "No bookings found",
            status: 400,
        });

        return res.status(200).send({
            message: "Bookings retrieved successfully",
            status: 200,
            bookings,
        });
    } catch (error) {
        res.status(400).send({
            message: "Error retrieving bookings",
            status: 400,
            error,
        });
    }
}


const createBooking = async(req, res) => {
    try {
        const {
            room,
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
            room,
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

const getBookingById = async(req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid id",
                status: 400
            });
        }
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(400).json({
                message: "Booking not found",
                status: 400
            });
        }
        return res.status(200).json({
            message: "Booking retrieved successfully",
            status: 200,
            booking
        });

    } catch (error) {
        res.status(400).json({
            message: "Error retrieving booking",
            error
        });

    }
}


const updateBooking = async(req, res) => {
    try {
        const { id } = req.params;
        const {
            room,
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

        const updatedBooking = await Booking.findByIdAndUpdate(id, {
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
            room,
            check_in,
            check_out,
        }, { new: true });

        res.status(200).send({
            message: "Booking updated",
            status: 200,
            updatedBooking,
        });
    } catch (error) {
        res.status(500).send({
            message: "Something went wrong, try again later",
            status: 500,
            error,
        });
    }
}

const deleteBooking = async(req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) return res.status(400).send({
            message: "Invalid id",
            status: 400,
        });

        const deletedBooking = await Booking.findByIdAndDelete(id);

        return res.status(200).send({
            message: "Booking deleted",
            status: 200,
            deletedBooking,
        });
    } catch (error) {
        res.status(500).send({
            message: "Something went wrong, try again later",
            status: 500,
            error,
        });
    }
}



module.exports = { getAllBookings, createBooking, updateBooking, deleteBooking, getBookingById }