const { getAllBookings, createBooking, updateBooking, deleteBooking, getBookingById } = require('../controllers/bookingControllers');
const { createCategory, getAllCategories, updateCategory, getCategoryById } = require('../controllers/categoryController');
const { createRoom, getAllRooms, getRoomById } = require('../controllers/roomControllers');
const { searchAvailable } = require('../controllers/searchController');
upload = require('../middlewares/multer');

const router = require('express').Router();

//bookings
router.get("/bookings", getAllBookings);
router.post("/booking", createBooking);
router.put("/booking/:id", updateBooking);
router.delete("/booking/:id", deleteBooking);
router.get("/booking/:id", getBookingById);

//search
router.get("/search", searchAvailable);


//categories
router.post("/category", upload.single('image'), createCategory);
router.get("/category/:id", getCategoryById);
router.get("/categories", getAllCategories);
router.put("/category/:id", upload.single('image'), updateCategory);

//rooms
router.post("/room", createRoom);
router.get("/room/:id", getRoomById);
router.get("/rooms", getAllRooms);


module.exports = router;