const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const reportRoutes = require("./routes/reportRoutes");


dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser()); 
app.use(cors({
    origin:"", 
    credentials: true 
}));

app.use('/client', express.static('client'))

connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/transactions", transactionRoutes);
app.use("/reports", reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
