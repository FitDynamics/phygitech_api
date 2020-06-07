// const jwt = require("jsonwebtoken");
// const config = require("../config/config");
// const logger = require("../commons/logger");

// module.exports = function auth(req, res, next) {

//     const token = req.header('auth-token');
//     if (!token) {
//         res.status(401).end("Unauthorized");
//     }
//     try {
//         const verified = jwt.verify(token, config.TOKEN);
//         req.user = verified._id;
//         logger.userId = req.user;
//         next();
//     }
//     catch (err) {
//         res.status(401).end("Unauthorized");
//     }
// }