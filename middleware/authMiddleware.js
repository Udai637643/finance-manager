const jwt = require("jsonwebtoken");

exports.authenticateUser = (req, res, next) => {
    const token = req.header("Authorization");
    
    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }
    
    try {
        console.log("Token should be",token)
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        console.log(decoded)
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid token." });
    }
};