const Booking = require("../models/bookingSchema");
const mongoose = require("mongoose");
const { format } = require("date-fns");
const random = require('random-string-alphanumeric-generator');
const Room = require("../models/roomSchema");
const { sendEmailBooking } = require('../utils/emailHandler.js');

const getAllBookings = async(req, res) => {
    const bookings = await Booking.find().populate({
        path: 'room',
        populate: {
            path: 'category',
            model: 'Category'
        }
    });

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

const getCurrentBookings = async(req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const bookings = await Booking.find({ check_in: { $lte: today }, check_out: { $gte: today } }).populate({
            path: 'room',
            populate: {
                path: 'category',
                model: 'Category'
            }
        });
        const emptyResponse = []
        if (!bookings || bookings.length === 0) return res.status(204).send({
            message: "No currents bookings found",
            status: 204,
            emptyResponse
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
            message: "Currents bookings retrieved successfully",
            status: 200,
            formattedBookings,
        });

    } catch (error) {
        console.log(error)

        res.status(400).send({
            message: "Error retrieving bookings",
            status: 400,
            error,
        })
    }
}

const getPastBookings = async(req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const bookings = await Booking.find({ check_out: { $lt: today } }).populate({
            path: 'room',
            populate: {
                path: 'category',
                model: 'Category'
            }
        });

        if (!bookings || bookings.length === 0) return res.status(400).send({
            message: "No past bookings found",
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
            message: "Past bookings retrieved successfully",
            status: 200,
            formattedBookings,
        });

    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: "Error retrieving bookings",
            status: 400,
            error,
        })
    }
}

const getUpcomingBookings = async(req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const bookings = await Booking.find({ check_out: { $gt: today } }).populate({
            path: 'room',
            populate: {
                path: 'category',
                model: 'Category'
            }
        });

        if (!bookings || bookings.length === 0) return res.status(400).send({
            message: "No upcoming bookings found",
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
            message: "Upcoming bookings retrieved successfully",
            status: 200,
            formattedBookings,
        });

    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: "Error retrieving bookings",
            status: 400,
            error,
        })
    }
}




const createBooking = async(req, res) => {
    try {
        const {
            category,
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
                paymentMethod,
                additionalComments,
                paymentStatus,
                price,
            },
        } = req.body;

        const datesToEmail = { check_in: check_in, check_out: check_out };


        const checkInDate = new Date(check_in);
        const checkOutDate = new Date(check_out);

        const rooms = await Room.find().populate('category');



        const roomsFilteredPerCategory = rooms.filter(room => room.category._id.toString() === category);

        const bookingsOnUserDate = await Booking.find({
            $and: [{
                    check_in: {
                        $lt: checkOutDate
                    }
                },
                {
                    check_out: {
                        $gt: checkInDate
                    }
                }
            ]
        }).populate('room')

        const bookedRoomIds = bookingsOnUserDate.map(booking => booking.room.id.toString());
        const availablesRooms = roomsFilteredPerCategory.filter(room => !bookedRoomIds.includes(room._id.toString()));

        if (availablesRooms.length === 0)
            return res.status(400).json({
                message: "No rooms available",
                status: 400,
            });


        const room = availablesRooms[0]._id;

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
            date: new Date(),
            bookingId: random.randomAlphanumeric(8, "uppercase"),
        });

        const savedBooking = await newBooking.save();

        sendEmailBooking(newBooking, datesToEmail)


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
            firstName,
            lastName,
            email,
            country,
            phone,
            passport,
            arrivalTime,
            passportType
        } = req.body;

        if (!mongoose.isValidObjectId(id)) return res.status(400).send({
            message: "Invalid id",
            status: 400,
        });

        let updateFields = {};
        if (firstName) updateFields['info.firstName'] = firstName;
        if (lastName) updateFields['info.lastName'] = lastName;
        if (email) updateFields['info.email'] = email;
        if (country) updateFields['info.country'] = country;
        if (phone) updateFields['info.phone'] = phone;
        if (passport) updateFields['info.passport'] = passport;
        if (arrivalTime) updateFields['info.arrivalTime'] = arrivalTime;
        if (passportType) updateFields['info.passportType'] = passportType;

        const updateBookingData = await Booking.findByIdAndUpdate(id, {
            $set: updateFields
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


module.exports = { getAllBookings, createBooking, updateBooking, deleteBooking, getBookingById, getPastBookings, getUpcomingBookings, getCurrentBookings }