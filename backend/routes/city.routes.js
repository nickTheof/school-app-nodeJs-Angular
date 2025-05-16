const express = require("express");
const cityController = require("../controllers/city.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Protect all routes: require valid token
router.use(authMiddleware.verifyToken);

// Public (or authenticated) routes
router.get("/", cityController.getAllCities);
router.get("/:id", cityController.getCityById);

// Restrict to ADMIN for modification routes
router.use(authMiddleware.verifyRoles("ADMIN"));

router.post("/", cityController.createCity);
router.patch("/:id", cityController.updateCityById);
router.delete("/:id", cityController.deleteCityById);

module.exports = router;
