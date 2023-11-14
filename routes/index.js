const { getAllBookings } = require('../controllers/bookingControllers');

const router = require('express').Router();


router.get("/bookings", getAllBookings);

module.exports = router;