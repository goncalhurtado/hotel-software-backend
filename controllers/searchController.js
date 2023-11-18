const Booking = require("../models/bookingSchema");
const mongoose = require("mongoose");
const { format } = require("date-fns");
const Room = require("../models/roomSchema");

const searchAvailable = async(req, res) => {
    const { check_in, check_out, capacity } = req.query;
    const capacityInt = Number(capacity);

    const checkInDate = new Date(check_in);
    const checkOutDate = new Date(check_out);


    if (checkInDate > checkOutDate) return res.status(400).json({
        message: "Check in date must be before check out date",
        status: 400,
    });


    try {
        const rooms = await Room.find().populate('category');

        const roomsFiltredPerCapacity = rooms.filter(room => room.category.capacity === capacityInt);


        if (!roomsFiltredPerCapacity || roomsFiltredPerCapacity.length === 0)
            return res.status(400).json({
                message: "No rooms available with this capacity",
                status: 400,
            });

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
        const availablesRooms = roomsFiltredPerCapacity.filter(room => !bookedRoomIds.includes(room._id.toString()));

        if (availablesRooms.length === 0)
            return res.status(400).json({
                message: "No rooms available",
                status: 400,
            });

        // roomsFiltredPerCapacity

        return res.status(200).json({
            message: `${availablesRooms.length} available rooms retrieved successfully`,
            status: 200,
            roomsFiltredPerCapacity
        });
    } catch (error) {
        res.status(400).json({
            message: "Error retrieving available rooms",
            error
        });

    }

}

module.exports = {
    searchAvailable
}