

const express = require('express');
//const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path')
const User = require('./models/userModel')
//const routes = require('./routes/route.js');
//const config = require("./config/config");
const logger = require("./commons/logger")('app');
const authRouter = require("./routes/authRouter");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
let { mongoose } = require("./db/mongoConnection");

require("dotenv").config({
 path: path.join(__dirname, "../.env")
});



logger.info("App Started.");
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // to support URL-encoded bodies
app.use(bodyParser.json({ limit: "50mb", extended: true })); // to support JSON-encoded bodies

 

 
// mongoose.Promise = global.Promise;

// const uri = config.mongooseUri;
// //console.log("url", uri)

// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, function (err) {
//     if (err) {
//         logger.error('mongooseConnection - Error while connecting to db : ', err);
//     } else {
//         logger.info("connected successfully to database");
//     }
// });

// mongoose
//  .connect('mongodb://localhost:27017/rbac')
//  .then(() => {
//   console.log('Connected to the Database successfully');
//  });
 
// app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(async (req, res, next) => {
 if (req.headers["x-access-token"]) {
  const accessToken = req.headers["x-access-token"];
  const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
  // Check if token has expired
  if (exp < Date.now().valueOf() / 1000) { 
   return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
  } 
  res.locals.loggedInUser = await User.findById(userId); next(); 
 } else { 
  next(); 
 } 
});
 
app.use('/', authRouter); app.listen(PORT, () => {
    logger.info("Server is listening on Port:"+PORT);
})
//app.use("/", authRouter);
// app.use("/document", devRouter);
//app.use("/", verify, masterRouter);