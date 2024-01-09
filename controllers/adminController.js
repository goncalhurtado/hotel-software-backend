const Admin = require("../models/adminSchema");
const mongoose = require("mongoose");
const { encryptPassword, comparePassword } = require("../utils/passwordHandler");
const jwt = require("jsonwebtoken");
dotenv = require("dotenv");


const getAllAdmins = async(req, res) => {
    const admins = await Admin.find();

    try {
        if (!admins || admins.length === 0) return res.status(400).send({
            message: "No admins found",
            status: 400,
        });

        return res.status(200).send({
            message: "Admins retrieved successfully",
            status: 200,
            admins
        });
    } catch (error) {
        res.status(400).send({
            message: "Error retrieving admins",
            status: 400,
            error,
        });
    }
}

const registerAdmin = async(req, res) => {
    const { name, email, password } = req.body;
    const adminExist = await Admin.findOne({ email });

    try {

        if (adminExist) return res.status(400).send({
            message: "Admin already exists",
            status: 400,
        });

        const admin = await Admin.create({
            name,
            email,
            password: encryptPassword(password)
        });

        return res.status(201).send({
            message: "Admin created successfully",
            status: 201,
            admin,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Error creating admin",
            status: 400,
            error,
        });
    }
}

const loginAdmin = async(req, res) => {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });
    const secret = process.env.JWT_SECRET;

    try {

        if (!user)
            return res.status(400).send({
                message: "User not found",
                status: 400,
            });
        if (!comparePassword(password, user.password))
            return res.status(404).send({
                message: "Invalid password",
                status: 400,
            })

        const payload = {
            sub: user._id,
            email: user.email,
            name: user.name,
        }
        const token = jwt.sign(payload, secret, { algorithm: process.env.JWT_ALGORITHM });
        return res.status(200).send({
            message: "Login successful",
            status: 200,
            token,
        });
    } catch (error) {
        res.status(404).send({
            message: "Error logging",
            status: 404,
            error,
        });

    }

}




const getAdminById = async(req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({
            message: "Invalid ID",
            status: 400,
        });

        const admin = await Admin.findById(id);

        if (!admin) return res.status(400).send({
            message: "Admin not found",
            status: 400,
        });

        return res.status(200).send({
            message: "Admin retrieved successfully",
            status: 200,
            admin,
        });
    } catch (error) {
        res.status(400).send({
            message: "Error retrieving admin",
            status: 400,
            error,
        });
    }
}

const deleteAdmin = async(req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({
            message: "Invalid ID",
            status: 400,
        });

        const admin = await Admin.findByIdAndDelete(id);

        if (!admin) return res.status(400).send({
            message: "Admin not found",
            status: 400,
        });

        return res.status(200).send({
            message: "Admin deleted successfully",
            status: 200,
            admin,
        });
    } catch (error) {
        res.status(400).send({
            message: "Error deleting admin",
            status: 400,
            error,
        });
    }
}

module.exports = { getAllAdmins, registerAdmin, getAdminById, deleteAdmin, loginAdmin };