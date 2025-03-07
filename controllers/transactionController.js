const Transaction = require("../models/Transaction.js");

exports.addTransaction = async (req, res) => {
    try {
        const { amount, date, category, description, type } = req.body;
        const transaction = new Transaction({
            userId: req.user.id,
            amount,
            date,
            category,
            description,
            type: type ? type : "expense"
        });
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ date: -1 });
        res.json({ transactions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateTransaction = async (req, res) => {
    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.transactionId, req.body, { new: true });
        res.json(updatedTransaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.transactionId);
        res.json({ message: "Transaction deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};