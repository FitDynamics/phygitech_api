//const test = require("./commons/test");
const express = require("express");
const bodyParser = require("body-parser");
let { mongoose } = require("./db/mongoConnection");
//const masterRouter = require("./routes/masterRouter");
const authRouter = require("./routes/authRouter");
//const devRouter = require("./routes/devRouter");
//const verify = require("./routes/verifyToken");
const cors = require("cors");
const app = express();
const dotenv = require('dotenv');
////const json2xls = require("json2xls");
dotenv.config();
const config = require("./config/config");
const path = require('path');
const logger = require("./commons/logger")('app');

logger.info("App Started");
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // to support URL-encoded bodies
app.use(bodyParser.json({ limit: "50mb", extended: true })); // to support JSON-encoded bodies
//app.use(json2xls.middleware);

//middleware to accept CORs
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // Calling this function invokes the next middleware function
    next();
});

app.listen(config.port, () => {
    // console.log(config)
    logger.info(`server started on ${config.port}`);
});

app.use(express.static(path.join(__dirname, 'build')));
// app.get('/hiringcenterweb/*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// process.on('unhandledRejection', function(reason, p){
//   // console.log("Possibly Unhandled Rejection at: Promise  reason: ", reason);
//   // application specific logging here
// });

app.use("/", authRouter);
// app.use("/document", devRouter);
//app.use("/", verify, masterRouter);