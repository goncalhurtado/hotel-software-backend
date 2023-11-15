const { getAllBookings, createBooking } = require('../controllers/bookingControllers');
const { createCategory, getAllCategories, updateCategory, getCategoryById } = require('../controllers/categoryController');
const upload = require('../middlewares/multer');

const router = require('express').Router();

//bookings
router.get("/bookings", getAllBookings);
router.post("/bookings", createBooking);

//categories
router.post("/category", upload.single('image'), createCategory);
router.get("/category", getAllCategories);
router.get("/category/:id", getCategoryById);
router.put("/category/:id", upload.single('image'), updateCategory);

module.exports = router;