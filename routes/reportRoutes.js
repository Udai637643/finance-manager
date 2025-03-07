const express = require("express");
const { getMonthlyReport, getYearlyReport, generateReport } = require("../controllers/reportController");
const { authenticateUser } = require("../controllers/authController");
const router = express.Router();

router.get("/monthly", authenticateUser, getMonthlyReport);
router.get("/yearly", authenticateUser, getYearlyReport);
router.get("/generate", authenticateUser, generateReport);

module.exports = router;
