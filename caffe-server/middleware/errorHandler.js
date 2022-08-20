function errorHandler(error, req, res, next) {
    if (error.name === "Invalid email or password") {
        res.status(400).json({ message: "Invalid email or password" })
    } else if (error.name === "EmailPasswordRequired") { 
        res.status(400).json({ message: "E-mail or password is required" })
    } else if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {    
        res.status(400).json({ message: error.errors[0].message });
    } else if (error.name === "NoToken") {
        res.status(401).json({ message: "Please login!" })
    } else if (error.name === "Unauthorized" || error.name === "JsonWebTokenError") {
        res.status(401).json({ message: "Invalid Token" })
    } else if (error.name === "NotFound") {
        res.status(404).json({ message: "Not Found" })
    } else {
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = errorHandler;