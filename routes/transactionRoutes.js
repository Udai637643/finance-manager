const express = require("express");
const { addTransaction, getTransactions, updateTransaction, deleteTransaction } = require("../controllers/transactionController");
const { authenticateUser } = require("../controllers/authController");
const router = express.Router();

router.post("/add", authenticateUser, addTransaction);
router.get("/", authenticateUser, getTransactions);
router.put("/:transactionId", authenticateUser, updateTransaction);
router.delete("/:transactionId", authenticateUser, deleteTransaction);

module.exports = router;