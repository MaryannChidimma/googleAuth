const jwt = require('jsonwebtoken');
const CustomError = require('../custom.error');


module.exports = (req, res, next) => {
    const token =req.headers.authorization?.split(" ")[1];
    if(!token) throw new CustomError('Access denied no token provided', 401)
    try {
        const decoder = jwt.verify(token, process.env.JWT_KEY)
        req.admin = decoder;
        next();
    }
    catch (error) {
        throw new CustomError('invalid token')
    };

};
