const express = require("express");
const router = express.Router();

const {
  getDashboard,
  createUser,
  getUsers,
  getUserById,
  createStore,
  getStores
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");


// Protect all admin routes
router.use(authMiddleware);
router.use(authorizeRoles("ADMIN"));


// Dashboard
router.get("/dashboard", getDashboard);


// User Management
router.post("/users", createUser);

router.get("/users", getUsers);

router.get("/users/:id", getUserById);


// Store Management
router.post("/stores", createStore);

router.get("/stores", getStores);


module.exports = router;