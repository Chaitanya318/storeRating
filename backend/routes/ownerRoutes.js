const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    getDashboard
} = require("../controllers/ownerController");


// Protect all owner routes
router.use(authMiddleware);


// Only store owners can access
router.get(
    "/dashboard",
    authorizeRoles("OWNER"),
    getDashboard
);


module.exports = router;