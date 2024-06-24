const jwt = require('jsonwebtoken');
require('dotenv').config();

async function authMiddlewares(req, res, next) {
    try {
        const authorization = req.headers['authorization'];
        if (!authorization) {
            return res.status(400).json({ message: "Please include authorization header" });
        }

        const token = authorization.split(" ")[1];
        if (!token) {
            return res.status(400).json({ message: "Please provide jwt token" });
        }

        const tokenPayload = await jwt.verify(token, process.env.JWT_SECRETE_KEY);

        req.user = {
            userId: tokenPayload?._doc?._id,
            firstName: tokenPayload?._doc?.firstName,
            lastName: tokenPayload?._doc?.lastName,
            email: tokenPayload?._doc?.email
        }

        return next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
}

module.exports = authMiddlewares;