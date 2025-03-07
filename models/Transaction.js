const mongoose = require("mongoose");
const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.String, ref: "User" },
    amount: Number,
    date: String,
    category: String,
    description: String,
    type: String
});
module.exports = mongoose.model("Transaction", TransactionSchema);