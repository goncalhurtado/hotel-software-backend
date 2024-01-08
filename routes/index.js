const { getAllAdmins, registerAdmin, deleteAdmin, getAdminById, loginAdmin } = require('../controllers/adminController');
const { getAllBookings, createBooking, updateBooking, deleteBooking, getBookingById, getUpcomingBookings, getPastBookings } = require('../controllers/bookingController');
const { createCategory, getAllCategories, updateCategory, getCategoryById, deleteCategory } = require('../controllers/categoryController');
const { createRoom, getAllRooms, getRoomById, updateRoom, deleteRoom, getRoomsByCategoryId } = require('../controllers/roomController');
const { searchAvailable } = require('../controllers/searchController');
const { postContact, getAllContacts, getPendingContacts, getAnsweredContacts, setAswered, setPending, deleteContact, getContactReports, responseContact } = require('../controllers/contactController');
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
router.get("/bookings/all", authenticateAdmin, getAllBookings);
router.get("/bookings/upcoming", authenticateAdmin, getUpcomingBookings);
router.get("/bookings/past", authenticateAdmin, getPastBookings);
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
router.get("/rooms/:categoryId", authenticateAdmin, getRoomsByCategoryId)
router.delete("/room/:id", authenticateAdmin, deleteRoom);


//contact
router.post("/contact", postContact);
router.get("/admin/contacts/all", authenticateAdmin, getAllContacts);
router.get("/admin/contacts/pending", authenticateAdmin, getPendingContacts);
router.get("/admin/contacts/pending/reports", authenticateAdmin, getContactReports);
router.put("/admin/contacts/pending/:id", authenticateAdmin, setPending);
router.get("/admin/contacts/answered", authenticateAdmin, getAnsweredContacts);
router.put("/admin/contacts/answered/:id", authenticateAdmin, setAswered);
router.delete("/admin/contacts/:id", authenticateAdmin, deleteContact);

//emailResponse
router.post("/admin/contacts/response", authenticateAdmin, responseContact);


//testEmail
// router.post("/testEmail", testEmail);

module.exports = router;