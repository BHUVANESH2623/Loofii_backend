// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';

const secretKey = 'secretkey'; // Replace with your actual secret key

export const verifyToken=(req, res, next)=> {
    const token = req.headers.authorization; // Assuming the token is sent in the "Authorization" header

    if (!token) {
        return res.status(401).json("Unauthorized"); // No token provided
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json("Unauthorized"); // Invalid token
        }

        req.user = decoded; // Attach the decoded user data to the request
        next();
    });
}

