const request = require("supertest");
const app = require("../server"); // Your Express app
const mongoose = require("mongoose");
const User = require("../models/User");

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await User.deleteMany(); // Clean existing users
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Authentication API", () => {
    let userToken;

    test("User Registration", async () => {
        const res = await request(app).post("/auth/register").send({
            name: "John Doe",
            email: "johndoe@example.com",
            password: "password123",
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("message", "Registration successful");
    });

    test("User Login", async () => {
        const res = await request(app).post("/auth/login").send({
            email: "johndoe@example.com",
            password: "password123",
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
        userToken = res.body.token;
    });
});
