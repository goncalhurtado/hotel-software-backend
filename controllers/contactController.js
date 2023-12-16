const Contact = require('../models/contactSchema')
    // const mongoose = require('mongoose')


const getAllContacts = async(req, res) => {
    try {
        const contacts = await Contact.find()
        res.status(200).send({
            message: "Contacts retrieved successfully",
            status: 200,
            contacts
        })
    } catch (error) {
        res.status(400).send({
            message: "Error retrieving contacts",
            status: 400,
            error
        })
    }
}

const postContact = async(req, res) => {
    try {
        const contact = await Contact.create(req.body)
        res.status(201).send({
            message: "Message sent successfully! We'll get in touch with you shortly.",
            status: 201,
            contact
        })
    } catch (error) {
        res.status(400).send({
            message: "Error creating contact",
            status: 400,
            error
        })
    }
}


module.exports = {
    getAllContacts,
    postContact
}