const { getAllAdmins, registerAdmin, deleteAdmin, getAdminById, loginAdmin } = require('../controllers/adminController');
const { getAllBookings, createBooking, updateBooking, deleteBooking, getBookingById } = require('../controllers/bookingController');
const { createCategory, getAllCategories, updateCategory, getCategoryById, deleteCategory } = require('../controllers/categoryController');
const { createRoom, getAllRooms, getRoomById, updateRoom, deleteRoom } = require('../controllers/roomController');
const { searchAvailable } = require('../controllers/searchController');
upload = require('../middlewares/multer');
const authenticateAdmin = require('../middlewares/authAdmin');
const router = require('express').Router();

//admin
router.get("/admins", authenticateAdmin, getAllAdmins);
router.post("/register", authenticateAdmin, registerAdmin);
router.delete("/admin/:id", authenticateAdmin, deleteAdmin);
router.get("/admin/:id", getAdminById);
router.post("/login", loginAdmin);

//bookings
router.get("/bookings", authenticateAdmin, getAllBookings);
router.post("/booking", createBooking);
router.put("/booking/:id", authenticateAdmin, updateBooking);
router.delete("/booking/:id", authenticateAdmin, deleteBooking);
router.get("/booking/:id", authenticateAdmin, getBookingById);

//search
router.get("/bookings/search", searchAvailable);

//categories
router.post("/category", authenticateAdmin, upload.single('image'), createCategory);
router.delete("/category/:id", authenticateAdmin, deleteCategory);
router.get("/category/:id", getCategoryById);
router.get("/categories", getAllCategories);
router.put("/category/:id", authenticateAdmin, upload.single('image'), updateCategory);

//rooms
router.post("/room", authenticateAdmin, createRoom);
router.put("/room/:id", authenticateAdmin, updateRoom);
router.get("/room/:id", getRoomById);
router.get("/rooms", getAllRooms);
router.delete("/room/:id", authenticateAdmin, deleteRoom);



module.exports = router;