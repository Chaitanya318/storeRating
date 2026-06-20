const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    changePassword,
    getStores,
    submitRating,
    updateRating
} = require("../controllers/userController");


// Protect all user routes
router.use(authMiddleware);


// USER and OWNER can change password
router.put(
    "/change-password",
    authorizeRoles("USER", "OWNER"),
    changePassword
);

router.get(
    "/stores",
    authorizeRoles("USER"),
    getStores
);

router.post(
    "/ratings",
    authorizeRoles("USER"),
    submitRating
);

router.put(
    "/ratings/:id",
    authorizeRoles("USER"),
    updateRating
);


module.exports = router;