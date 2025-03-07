# Personal Finance Manager 💰

## Overview
Personal Finance Manager is a web application for tracking financial transactions, managing expenses, and generating insightful financial reports.

## 🛠️ Setup

1. **Clone the repository**  
   ```bash
   git clone(https://github.com/Udai637643/finance-manager)
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
[Live Application](https://finance-manager-lf1w.onrender.com/client/)

## 📸 Screenshots
![Dashboard](https://github.com/user-attachments/assets/35fbe7f7-90f9-4445-80d2-c39d0dcec8aa)
![Visual Charts](https://github.com/user-attachments/assets/ba2a03a1-778e-4206-b55a-12db5d30461e)

![Transaction Page](https://github.com/user-attachments/assets/0a60a589-7497-4e6e-84cd-fcffde84a280)
![Add Transaction](https://github.com/user-attachments/assets/b09a423b-fbe6-424a-8fe6-dde794ce022e)


## 🎥 Video Demo
[![Watch the Demo](https://github.com/user-attachments/assets/35fbe7f7-90f9-4445-80d2-c39d0dcec8aa)](https://github.com/user-attachments/assets/22bd8519-43b5-490a-a03e-4cbb793db1c6)




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

🌐 **Live Demo**: [Live Application](https://finance-manager-lf1w.onrender.com/client/)
