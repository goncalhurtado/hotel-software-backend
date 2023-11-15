const Category = require('../models/categorySchema');
const cloudinary = require('cloudinary').v2;

const createCategory = async(req, res) => {
    const { name, description, price, capacity } = req.body;
    const { path } = req.file;
    const categories = await Category.find({ name });
    const cloudinaryImg = await cloudinary.uploader.upload(path);
    try {
        // console.log(categories);
        // if (categories) {
        //     return res.status(400).json({
        //         message: `Category ${name} already exists`,
        //         status: 400
        //     });
        // }

        const newCategory = new Category({
            name,
            description,
            price,
            capacity,
            image: cloudinaryImg.secure_url
        });
        await newCategory.save();
        res.status(201).json({
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
        if (categories) {
            return res.status(400).json({
                message: "No categories found",
                status: 400
            });
        }

        res.status(200).json({
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


module.exports = {
    createCategory,
    getAllCategories
}