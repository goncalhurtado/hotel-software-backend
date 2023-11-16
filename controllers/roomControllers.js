const Room = require('../models/roomSchema');
const Category = require('../models/categorySchema');

const createRoom = async(req, res) => {
    const { number, category } = req.body;
    const categoryById = await Category.findById(category);

    try {
        const existingRoom = await Room.findOne({ number });

        if (existingRoom) {
            return res.status(400).json({
                message: `Room ${number} already exists`,
                status: 400,
                response: existingRoom
            });
        }

        const newRoom = new Room({
            number,
            category
        });
        await newRoom.save();
        res.status(201).json({
            message: `Room ${number} created successfully on category ${categoryById.name}`,
            status: 201,
            newRoom
        });
    } catch (error) {
        res.status(400).json({ message: "Error creating room" });
    }
}


const getAllRooms = async(req, res) => {
    try {
        const rooms = await Room.find().populate('category');
        if (!rooms) {
            return res.status(400).json({
                message: "No rooms found",
                status: 400
            });
        }

        return res.status(200).json({
            message: "Rooms retrieved successfully",
            status: 200,
            rooms
        });
    } catch (error) {
        res.status(400).json({
            message: "Error retrieving rooms",
            error
        });
    }
}


module.exports = {
    createRoom,
    getAllRooms

}