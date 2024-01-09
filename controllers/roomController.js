const Room = require('../models/roomSchema');
const Category = require('../models/categorySchema');
const mongoose = require('mongoose');

const createRoom = async(req, res) => {
    const { number, category } = req.body;


    try {

        const categoryById = await Category.findById(category);

        if (!mongoose.isValidObjectId(category)) {
            return res.status(400).json({
                message: "Invalid id",
                status: 400
            });
        }



        const existingRoom = await Room.findOne({ number });
        if (existingRoom && String(existingRoom._id) !== categoryById._id) {

            return res.status(400).json({
                message: `Room ${number} already exists`,
                status: 400,
                response: existingRoom
            });
        }



        if (!categoryById) {
            return res.status(400).json({
                message: `Category does not exist`,
                status: 400,

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
        console.log(error);
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

const getRoomsByCategoryId = async(req, res) => {
    const { categoryId } = req.params;
    try {

        if (!mongoose.isValidObjectId(categoryId)) {
            return res.status(400).json({
                message: "Invalid id",
                status: 400
            });
        }

        const rooms = await Room.find({ category: categoryId });
        return res.status(200).json({
            message: "Rooms retrieved successfully",
            status: 200,
            rooms
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error });
    }
}



const getRoomById = async(req, res) => {
    const { id } = req.params;
    try {

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid id",
                status: 400
            });
        }


        const room = await Room.findById(id).populate('category');
        if (!room) {
            return res.status(400).json({
                message: "Room not found",
                status: 400
            });
        }

        return res.status(200).json({
            message: "Room retrieved successfully",
            status: 200,
            room
        });
    } catch (error) {
        res.status(400).json({
            message: "Error retrieving room",
            error
        });
    }
}

const updateRoom = async(req, res) => {

    const { id } = req.params;
    const { number, category } = req.body;

    try {
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid id",
                status: 400
            });
        }

        const existingRoom = await Room.findOne({ number });
        if (existingRoom && String(existingRoom._id) !== id) {

            return res.status(400).json({
                message: `Room ${number} already exists`,
                status: 400,
                response: existingRoom
            });
        }

        const categoryById = await Category.findById(category);

        if (!categoryById) {
            return res.status(400).json({
                message: `Category ${category} does not exist`,
                status: 400,

            });
        }

        const updatedRoom = await Room.findByIdAndUpdate(id, {
            number: number || existingRoom.number,
            category: category || existingRoom.category
        }, { new: true });

        return res.status(200).json({
            message: "Room updated successfully",
            status: 200,
            updatedRoom
        });
    } catch (error) {
        res.status(400).json({
            message: "Error updating room",
            error
        });
    }
}


const deleteRoom = async(req, res) => {
    const { id } = req.params;
    try {

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid id",
                status: 400
            });
        }

        const room = await Room.findByIdAndDelete(id);
        if (!room) {
            return res.status(400).json({
                message: "Room not found",
                status: 400
            });
        }
        res.status(200).json({
            message: "Room deleted successfully",
            status: 200,
            room
        });
    } catch (error) {
        return res.status(400).json({
            message: "Error deleting room",
            error
        });
    }
}



module.exports = {
    createRoom,
    getAllRooms,
    getRoomById,
    updateRoom,
    deleteRoom,
    getRoomsByCategoryId
}