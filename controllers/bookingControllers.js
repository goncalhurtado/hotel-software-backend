const Booking = require("../models/bookingSchema");
const mongoose = require("mongoose");
const { format } = require("date-fns");

const getAllBookings = async(req, res) => {
    const bookings = await Booking.find().populate('room');


    try {

        if (!bookings || bookings.length === 0) return res.status(400).send({
            message: "No bookings found",
            status: 400,
        });

        const formattedBookings = bookings.map(booking => {
            const formattedCheckIn = format(new Date(booking.check_in), "MM/dd/yyyy");
            const formattedCheckOut = format(new Date(booking.check_out), "MM/dd/yyyy");

            return {
                ...booking.toObject(),
                check_in: formattedCheckIn,
                check_out: formattedCheckOut,
            };
        });

        return res.status(200).send({
            message: "Bookings retrieved successfully",
            status: 200,
            formattedBookings
        });
    } catch (error) {
        console.log(error)
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

        const checkInDate = new Date(check_in);
        const checkOutDate = new Date(check_out);

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
            check_in: checkInDate,
            check_out: checkOutDate,
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
        let booking = await Booking.findById(id).populate('room');

        booking.check_in = format(new Date(booking.check_in), "MM/dd/yyyy");
        booking.check_out = format(new Date(booking.check_out), "MM/dd/yyyy");

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

        if (!mongoose.isValidObjectId(id)) return res.status(400).send({
            message: "Invalid id",
            status: 400,
        });

        const updateBookingData = await Booking.findByIdAndUpdate(id, {
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

        if (!updateBookingData || updateBookingData === null) return res.status(400).send({
            message: "Booking not found",
            status: 400,
        });

        return res.status(200).send({
            message: "Booking updated",
            status: 200,
            updateBookingData,
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

const searchAvailableRooms = async(req, res) => {
    const { check_in, check_out, capacity } = req.body;
    const checkInDate = new Date(check_in);
    const checkOutDate = new Date(check_out);


    try {
        const availableRooms = await Room.find({ capacity: { $gte: capacity } }).populate('category');
        const bookings = await Booking.find({ check_in: { $gte: checkInDate }, check_out: { $lte: checkOutDate } }).populate('room');
        const bookedRooms = bookings.map(booking => booking.room);
        const filteredRooms = availableRooms.filter(room => !bookedRooms.includes(room._id));
        return res.status(200).json({
            message: "Available rooms retrieved successfully",
            status: 200,
            filteredRooms
        });
    } catch (error) {
        res.status(400).json({
            message: "Error retrieving available rooms",
            error
        });

    }

}



module.exports = { getAllBookings, createBooking, updateBooking, deleteBooking, getBookingById }