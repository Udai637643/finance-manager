# Personal Finance Manager 💰

## Overview
Personal Finance Manager is a web application for tracking financial transactions, managing expenses, and generating insightful financial reports.

## 🛠️ Setup

1. **Clone the repository**  
   ```bash
   git clone (https://github.com/Udai637643/finance-manager)
   cd personal-finance-manager
   ```

2. **Install Node.js (16+ recommended)**  
   - Download from [Node.js official site](https://nodejs.org/)  
   - Verify installation:  
     ```bash
     node -v
     npm -v
     ```

3. **Configure MongoDB**  
   - Install and run MongoDB locally OR use [MongoDB Atlas](https://www.mongodb.com/atlas)  
   - Update the `.env` file with your MongoDB connection string:  
     ```
     MONGO_URI=your_mongodb_connection_string
     ```

4. **Install dependencies**  
   ```bash
   npm install
   ```

5. **Run the backend server**  
   ```bash
   npm start
   ```

6. **Open frontend**  
   - Open `index.html` in your browser manually  
   - OR use a local server (e.g., Live Server extension in VS Code)

🚀 Now your app is ready to use!

---

## 🔗 Live Demo
[Live Application](https://your-live-link.com](https://finance-manager-lf1w.onrender.com/client/)

## 📸 Screenshots
![Dashboard](screenshots/dashboard.png)
![Transaction Page](screenshots/transactions.png)

## 🎥 Video Demo
[![Watch the Demo](https://img.youtube.com/vi/your-video-id/0.jpg)](https://youtu.be/your-video-id)

## 🚀 Features

- **User Authentication**: Secure login and registration using JWT.
- **Transaction Management**: Add, update, view, and delete transactions.
- **Category Management**: Organize transactions into predefined and custom categories.
- **Financial Reports**: Generate income, expense, and savings reports with bar and pie charts.
- **Responsive UI**: Built with HTML, CSS, and JavaScript for a seamless experience.

## 💻 Technologies Used

- **Node.js & Express.js**: Backend API development.
- **MongoDB & Mongoose**: NoSQL database for storing transactions.
- **JWT Authentication**: Secure authentication using JSON Web Tokens.
- **HTML, CSS, JavaScript**: Frontend development.
- **Chart.js**: Data visualization for financial reports.

## 📌 API Endpoints

### User Authentication

#### Register User
`POST /auth/register`
```json
{
    "name": "John Doe", 
    "email": "johndoe@example.com", 
    "password": "password123"
}
```

#### Login User
`POST /auth/login`
```json
{
    "email": "johndoe@example.com", 
    "password": "password123"
}
```

### Transaction Management

#### Add Transaction
`POST /transactions`
```json
{
    "amount": 500.0, 
    "date": "2025-01-24", 
    "category": "Food", 
    "description": "Groceries"
}
```

#### Get Transactions
`GET /transactions?page=1&size=10`

#### Update Transaction
`PUT /transactions/{transactionId}`
```json
{
    "amount": 600.0, 
    "date": "2025-02-01", 
    "category": "Food", 
    "description": "Updated Groceries"
}
```

#### Delete Transaction
`DELETE /transactions/{transactionId}`

## 🤝 Contributing
1. Fork repository
2. Create branch
3. Commit changes
4. Push to branch
5. Open pull request

---

📧 **Contact**: [Udai Lal Regar](udai637643@gmail.com)  

🌐 **Live Demo**: [Live Application](https://your-live-link.com](https://finance-manager-lf1w.onrender.com/client/)
