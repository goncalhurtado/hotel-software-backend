const nodemailer = require('nodemailer')
const { templateEmailBooking, emailTemplateResponseContact } = require('./template.js')

const sendEmailBooking = async(booking, datesToEmail) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    try {
        const response = await new Promise((resolve, reject) => {
            transporter.sendMail(emailTemplate(booking, datesToEmail), (error, info) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(info);
                }
            });
        });
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}

const emailTemplate = (booking, datesToEmail) => {
    return {
        from: process.env.EMAIL_USER,
        to: booking.info.email,
        subject: `Booking Confirmation number ${booking.bookingId}`,
        html: templateEmailBooking(booking, datesToEmail)
    }
}

const sendEmailResponseContact = async(emailData) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    try {
        const response = await new Promise((resolve, reject) => {
            transporter.sendMail(sendEmailContact(emailData), (error, info) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(info);
                }
            });
        });
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}

const sendEmailContact = (emailData) => {
    return {
        from: process.env.EMAIL_USER,
        to: `${emailData.email}`,
        subject: `${emailData.subject}`,
        html: emailTemplateResponseContact(emailData)
    }
}

module.exports = {
    sendEmailBooking,
    sendEmailResponseContact
}