const { getAllAdmins, registerAdmin, deleteAdmin, getAdminById, loginAdmin } = require('../controllers/adminController');
const { getAllBookings, createBooking, updateBooking, deleteBooking, getBookingById } = require('../controllers/bookingController');
const { createCategory, getAllCategories, updateCategory, getCategoryById, deleteCategory } = require('../controllers/categoryController');
const { createRoom, getAllRooms, getRoomById, updateRoom, deleteRoom } = require('../controllers/roomController');
const { searchAvailable } = require('../controllers/searchController');
upload = require('../middlewares/multer');

const router = require('express').Router();

//admin
router.get("/admins", getAllAdmins);
router.post("/register", registerAdmin);
router.delete("/admin/:id", deleteAdmin);
router.get("/admin/:id", getAdminById);
router.post("/login", loginAdmin);

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
router.delete("/category/:id", deleteCategory);
router.get("/category/:id", getCategoryById);
router.get("/categories", getAllCategories);
router.put("/category/:id", upload.single('image'), updateCategory);

//rooms
router.post("/room", createRoom);
router.put("/room/:id", updateRoom);
router.get("/room/:id", getRoomById);
router.get("/rooms", getAllRooms);
router.delete("/room/:id", deleteRoom);



module.exports = router;