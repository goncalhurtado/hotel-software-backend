const Booking = require("../models/bookingSchema");
const mongoose = require("mongoose");
const { format } = require("date-fns");
const Room = require("../models/roomSchema");

const searchAvailable = async(req, res) => {
    const { check_in, check_out, capacity } = req.query;
    const capacityInt = Number(capacity);
    const checkInDate = new Date(check_in);
    const checkOutDate = new Date(check_out);
    const forConsole = req.query;

    try {
        const rooms = await Room.find().populate('category');
        const availableRooms = rooms.filter(room => room.category.capacity === capacityInt);




        const bookings = await Booking.find({ check_in: { $gte: checkInDate }, check_out: { $lte: checkOutDate } }).populate('room');




        const bookedRooms = bookings.map(booking => booking.room);
        const filteredRooms = availableRooms.filter(room => !bookedRooms.includes(room.id));
        return res.status(200).json({
            message: "Available rooms retrieved successfully",
            status: 200,

            bookings

        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Error retrieving available rooms",
            error
        });

    }

}

module.exports = {
    searchAvailable
}