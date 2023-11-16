const Category = require('../models/categorySchema');
const cloudinary = require('cloudinary').v2;

const createCategory = async(req, res) => {
    const { name, description, price, capacity } = req.body;
    const { path } = req.file;
    const categories = await Category.find({ name });
    const cloudinaryImg = await cloudinary.uploader.upload(path);
    try {

        if (categories) {
            return res.status(404).json({
                message: `Category ${name} already exists`,
                status: 404
            });
        }

        if (!path) {
            return res.status(400).json({
                message: "Please upload an image",
                status: 400
            });
        }

        const newCategory = new Category({
            name,
            description,
            price,
            capacity,
            image: cloudinaryImg.secure_url
        });
        await newCategory.save();
        return res.status(201).json({
            message: "Category created successfully",
            status: 201,
            newCategory
        });
    } catch (error) {
        res.status(400).json({ message: "Error creating category", error });
    }
}

const getAllCategories = async(req, res) => {
    try {
        const categories = await Category.find();
        if (!categories) {
            return res.status(400).json({
                message: "No categories found",
                status: 400
            });
        }

        return res.status(200).json({
            message: "Categories retrieved successfully",
            status: 200,
            categories
        });
    } catch (error) {
        res.status(400).json({
            message: "Error retrieving categories",
            error
        });
    }
}

const updateCategory = async(req, res) => {

    const { id } = req.params;
    const { name, description, price, capacity } = req.body;
    const { path } = req.file;
    const cloudinaryImg = await cloudinary.uploader.upload(path);

    try {

        const categoryById = Category.findById(id);

        if (!categoryById) {
            return res.status(400).json({
                message: "Category not found",
                status: 400
            });
        }

        const category = await Category.findByIdAndUpdate(id, {
            name,
            description,
            price,
            capacity,
            image: cloudinaryImg.secure_url
        }, { new: true });
        if (!category) {
            return res.status(400).json({
                message: "Category not found",
                status: 400
            });
        }
        res.status(200).json({
            message: "Category updated successfully",
            status: 200,
            category
        });
    } catch (error) {
        return res.status(400).json({
            message: "Error updating category",
            error
        });
    }
}


const getCategoryById = async(req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(400).json({
                message: "Category not found",
                status: 400
            });
        }
        res.status(200).json({
            message: "Category retrieved successfully",
            status: 200,
            category
        });
    } catch (error) {
        return res.status(400).json({
            message: "Error retrieving category",
            error
        });
    }
}



module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    getCategoryById
}