const express = require("express");
const updateDisableFieldController = require("../../../controllers/users/common/updateDisableFieldController");
const updateProfileImageController = require("../../../controllers/users/common/updateProfileImageController");

const router = express.Router();

// Define the route for creating data for an admin
router.post("/disable", updateDisableFieldController);
router.post("/profileChange", updateProfileImageController);

module.exports = router;
