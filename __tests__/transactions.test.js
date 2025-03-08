const request = require("supertest");
const app = require("../server"); // Import your Express app
const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

let userToken;
let userId;
let transactionId;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // Create a test user with hashed password
    const hashedPassword = await bcrypt.hash("password123", 10);
    const user = new User({
        name: "Test User",
        email: "testuser@example.com",
        password: hashedPassword,
    });
    await user.save();
    userId = user._id;

    // Generate JWT token
    userToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
});

afterAll(async () => {
    await Transaction.deleteMany(); // Clean up transactions
    await User.deleteMany(); // Clean up users
    await mongoose.connection.close();
});

describe("Transactions API", () => {
    test("Add Transaction", async () => {
        const res = await request(app)
            .post("/transactions/add")
            .set("Cookie", `token=${userToken}`) // Send token as a cookie
            .send({
                amount: 500.0,
                date: "2025-01-24",
                category: "Food",
                description: "Groceries",
                type: "expense",
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("_id");
        expect(res.body).toHaveProperty("amount", 500.0);
        expect(res.body).toHaveProperty("category", "Food");
        transactionId = res.body._id;
    });

    test("Get Transactions", async () => {
        const res = await request(app)
            .get("/transactions")
            .set("Cookie", `token=${userToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("transactions");
        expect(Array.isArray(res.body.transactions)).toBe(true);
    });

    test("Update Transaction", async () => {
        const res = await request(app)
            .put(`/transactions/${transactionId}`)
            .set("Cookie", `token=${userToken}`)
            .send({ amount: 600.0 });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("amount", 600.0);
    });

    test("Delete Transaction", async () => {
        const res = await request(app)
            .delete(`/transactions/${transactionId}`)
            .set("Cookie", `token=${userToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message", "Transaction deleted successfully");
    });
});
