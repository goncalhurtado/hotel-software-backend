const { getAllBookings, createBooking } = require('../controllers/bookingControllers');
const { createCategory, getAllCategories } = require('../controllers/categoryController');
const upload = require('../middlewares/multer');

const router = require('express').Router();

//bookings
router.get("/bookings", getAllBookings);
router.post("/bookings", createBooking);

//categories
router.post("/category", upload.single('image'), createCategory);
router.get("/category", getAllCategories);

module.exports = router;