const Contact = require('../models/contactSchema');
const { format } = require("date-fns");
const { sendEmailResponseContact } = require('../utils/emailHandler.js');


const getAllContacts = async(req, res) => {
    try {
        const unformatedContacts = await Contact.find()


        const contacts = unformatedContacts.map(contact => {
            const formattedDate = format(new Date(contact.date), "MM/dd/yyyy HH:mm");

            return {
                ...contact.toObject(),
                date: formattedDate
            }
        })
        res.status(200).send({
            message: "All contacts retrieved successfully",
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

const getPendingContacts = async(req, res) => {
    try {
        const unformatedContacts = await Contact.find({ status: 'pending' })


        const contacts = unformatedContacts.map(contact => {
            const formattedDate = format(new Date(contact.date), "MM/dd/yyyy HH:mm");

            return {
                ...contact.toObject(),
                date: formattedDate
            }
        })


        res.status(200).send({
            message: "Pending contacts retrieved successfully",
            status: 200,
            contacts
        })
    } catch (error) {
        res.status(400).send({
            message: "Error retrieving pending contacts",
            status: 400,
            error
        })
    }
}

const setPending = async(req, res) => {
    try {
        const { id } = req.params
        const contact = await Contact.findByIdAndUpdate(id, { status: 'pending' })
        res.status(200).send({
            message: "Contact set on pending successfully",
            status: 200,
            contact
        })
    } catch (error) {
        res.status(400).send({
            message: "Error updating contact",
            status: 400,
            error
        })
    }
}

const getContactReports = async(req, res) => {
    try {
        const contacts = await Contact.find({ status: 'pending' })

        const totalContacts = contacts.length
        const totalPendingContacts = contacts.filter(contact => contact.status === 'pending').length
        const totalAnsweredContacts = contacts.filter(contact => contact.status === 'answered').length
        console.log(totalContacts, totalPendingContacts, totalAnsweredContacts);
        res.status(200).send({
            message: "Contact reports retrieved successfully",
            status: 200,
            totalContacts,
            totalPendingContacts,
            totalAnsweredContacts
        })
    } catch (error) {
        res.status(400).send({
            message: "Error retrieving contact reports",
            status: 400,
            error
        })
    }
}

const getAnsweredContacts = async(req, res) => {
    try {
        const unformatedContacts = await Contact.find({ status: 'answered' })

        const contacts = unformatedContacts.map(contact => {
            const formattedDate = format(new Date(contact.date), "MM/dd/yyyy HH:mm");

            return {
                ...contact.toObject(),
                date: formattedDate
            }
        })



        res.status(200).send({
            message: "Answered contacts retrieved successfully",
            status: 200,
            contacts
        })
    } catch (error) {
        res.status(400).send({
            message: "Error retrieving answered contacts",
            status: 400,
            error
        })
    }
}

const setAswered = async(req, res) => {
    try {
        const { id } = req.params
        const contact = await Contact.findByIdAndUpdate(id, { status: 'answered' })
        res.status(200).send({
            message: "Contact set aswered successfully",
            status: 200,
            contact
        })
    } catch (error) {
        res.status(400).send({
            message: "Error updating contact",
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

const deleteContact = async(req, res) => {
    try {
        const { id } = req.params
        const contact = await Contact.findByIdAndDelete(id)
        res.status(200).send({
            message: "Contact deleted successfully",
            status: 200,
            contact
        })
    } catch (error) {
        res.status(400).send({
            message: "Error deleting contact",
            status: 400,
            error
        })
    }
}

const responseContact = async(req, res) => {
    try {
        const { setAnswered, id } = req.body;
        console.log(setAnswered, id);
        if (setAnswered) {
            try {
                const contact = await Contact.findByIdAndUpdate(id, { status: 'answered' })
            } catch (error) {
                console.log(error);
                return res.status(400).send({
                    message: "Error updating contact",
                    status: 400,
                    error
                });
            }
        }

        const emailData = req.body
        sendEmailResponseContact(emailData)


        return res.status(200).send({
            message: "Response sent successfully",
            status: 200,

        })
    } catch (error) {
        res.status(400).send({
            message: "Error retrieving contact",
            status: 400,
            error
        })
    }
}


module.exports = {
    getAllContacts,
    postContact,
    getPendingContacts,
    getAnsweredContacts,
    setAswered,
    setPending,
    deleteContact,
    getContactReports,
    responseContact
}