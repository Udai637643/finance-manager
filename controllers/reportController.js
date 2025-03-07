const Transaction = require("../models/Transaction");
const { createCanvas } = require("canvas");

exports.getMonthlyReport = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        const income = 1000;
        const expenses = 500;
        const savings = income - expenses;

        res.json({
            month: "January",
            year: 2025,
            income,
            expenses,
            savings,
            visualRepresentation: "base64-image-data"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getYearlyReport = async (req, res) => {
    try {
        const income = 12000;
        const expenses = 6000;
        const savings = income - expenses;

        res.json({
            year: 2025,
            income,
            expenses,
            savings,
            visualRepresentation: "base64-image-data"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.generateReport = async (req, res) => {
    try {
        const { month, year } = req.query;
        const userId = req.user.id;

        // Fetch all transactions for the user
        const transactions = await Transaction.find({ userId });

        let totalIncome = 0, totalExpenses = 0;
        let categoryBreakdown = {};

        // Convert query params to numbers for filtering
        const filterMonth = month ? parseInt(month) : null;
        const filterYear = year ? parseInt(year) : null;

        transactions.forEach(transaction => {
            const transactionDate = new Date(transaction.date); // Convert stored string to Date

            if (
                (!filterMonth || transactionDate.getMonth() + 1 === filterMonth) &&
                (!filterYear || transactionDate.getFullYear() === filterYear)
            ) {
                if (transaction.type === "income") {
                    totalIncome += transaction.amount;
                } else if (transaction.type === "expense") {
                    totalExpenses += transaction.amount;
                    categoryBreakdown[transaction.category] =
                    (categoryBreakdown[transaction.category] || 0) + transaction.amount;
                }
                
            }
        });

        const savings = totalIncome - totalExpenses;

        const pieChartBase64 = generatePieChart(categoryBreakdown);

        // Generate Bar Graph
        const barGraphBase64 = generateBarGraph(totalIncome, totalExpenses, savings);

        res.json({
            totalIncome,
            totalExpenses,
            savings,
            categoryBreakdown,
            visualRepresentation: {
                pieChart: pieChartBase64,
                barGraph: barGraphBase64,
            },
        });
    } catch (error) {
        res.status(500).json({ error: "Error generating report" });
    }
};

const generatePieChart = (categoryData) => {
    const canvas = createCanvas(500, 400); // Increased width for legend
    const ctx = canvas.getContext("2d");

    // Total sum of all category amounts
    const totalAmount = Object.values(categoryData).reduce((sum, val) => sum + val, 0);
    if (totalAmount === 0) return "";

    // Define colors for categories (randomized)
    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF", "#FF9F40"];
    const categories = Object.keys(categoryData);
    const values = Object.values(categoryData);

    let startAngle = 0;

    categories.forEach((category, index) => {
        const sliceAngle = (values[index] / totalAmount) * (2 * Math.PI);
        ctx.fillStyle = colors[index % colors.length]; // Assign color
        ctx.beginPath();
        ctx.moveTo(200, 200); // Center of the pie chart
        ctx.arc(200, 200, 150, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fill();
        startAngle += sliceAngle;
    });

    // Draw category labels (Legend)
    categories.forEach((category, index) => {
        const legendX = 370, legendY = 50 + index * 30;

        // Draw color box
        ctx.fillStyle = colors[index % colors.length];
        ctx.fillRect(legendX, legendY, 20, 20);

        // Draw category name
        ctx.fillStyle = "black";
        ctx.font = "14px Arial";
        ctx.fillText(`${category}: ${values[index]}`, legendX + 30, legendY + 15);
    });

    return canvas.toDataURL().split(",")[1]; // Return Base64 string
};

const generateBarGraph = (income, expenses, savings) => {
    const canvas = createCanvas(400, 400);
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Bar properties
    const barWidth = 60;
    const barSpacing = 50;
    const baseHeight = 350;
    const maxHeight = Math.max(income, expenses, savings) || 1; // Avoid division by zero
    const scale = 200 / maxHeight; // Scale factor for bars

    const categories = ["Income", "Expenses", "Savings"];
    const values = [income, expenses, savings];
    const colors = ["blue", "red", "green"];

    // Draw bars and labels
    values.forEach((value, index) => {
        const x = 50 + index * (barWidth + barSpacing);
        const barHeight = value * scale;

        // Draw bar
        ctx.fillStyle = colors[index];
        ctx.fillRect(x, baseHeight - barHeight, barWidth, barHeight);

        // Display value above bar
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.fillText(value, x + barWidth / 4, baseHeight - barHeight - 10);

        // Category label below bar
        ctx.fillText(categories[index], x + 5, baseHeight + 20);
    });

    // Draw Y-Axis
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(30, 50);
    ctx.lineTo(30, baseHeight);
    ctx.stroke();

    // Y-Axis Label
    ctx.font = "18px Arial";
    ctx.fillText("Amount", 5, 30);

    // Title
    ctx.font = "20px Arial";
    ctx.fillText("Financial Summary", 100, 30);

    return canvas.toDataURL().split(",")[1]; // Return Base64
};

