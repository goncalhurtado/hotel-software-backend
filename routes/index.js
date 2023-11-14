const { getAllBookings, createBooking } = require('../controllers/bookingControllers');

const router = require('express').Router();


router.get("/bookings", getAllBookings);
router.post("/bookings", createBooking);

module.exports = router;