const templateEmailBooking = (booking, datesToEmail) => {
    return (
        `<!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <title>Document</title>
        </head>

        <body style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0;">
            <div style="width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
                <div style="text-align: center; padding: 20px 0; background-color: #3f51b5; color: #FFFFFF;">
                    <h1 style="margin: 0;">Reservation Confirmation</h1>
                </div>
                <div style="padding: 20px;">
                    <p style="font-size: 18px;">Dear ${booking.info.firstName},</p>
                    <p style="font-size: 16px;">Thank you for choosing our hotel for your upcoming stay. We are delighted to confirm your reservation details as follows:</p>
                    <p style="font-size: 16px;"><strong>Booking ID:</strong> ${booking.bookingId}</p>
                    <p style="font-size: 16px;"><strong>Check-in:</strong> ${datesToEmail.check_in}</p>
                    <p style="font-size: 16px;"><strong>Check-out:</strong> ${datesToEmail.check_out}</p>
                    <p style="font-size: 16px;"><strong>Total Price:</strong> ${booking.info.price}</p>
                    <p style="font-size: 16px;">We look forward to welcoming you to our hotel. If you have any questions or need to make changes to your reservation, please do not hesitate to contact us.</p>
                    <p style="font-size: 16px;">Best Regards,</p>
                    <p style="font-size: 16px;"><strong>Hotel Software</strong></p>
                </div>
            </div>
        </body>

        </html>
`
    )
}

const emailTemplateResponseContact = (emailData) => {
    return (
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Document</title>
        </head>

        <body style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0;">
            <div style="width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
                <div style="text-align: center; padding: 20px 0; background-color: #3f51b5; color: #FFFFFF;">
                <h1 style="margin: 0;">Hotel</h1>
                </div>
                <div style="padding: 20px;">
                    <p style="font-size: 16px;">${emailData.response}</p>
                </div>
            </div>
        </body>
        </html>
`
    )
}

module.exports = {
    templateEmailBooking,
    emailTemplateResponseContact
}