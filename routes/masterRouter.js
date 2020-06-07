// const express = require("express");
// const masterRouter = express.Router();
// const multer = require("multer");
// const upload = multer();
// var HiringCenter = require("./../models/hiringCenterModel");
// var Person = require("./../models/personModel");
// var OTP = require("./../models/otpModel");
// var Onboarding = require("./../models/onboardingModel");

// // controllers used in authRouter
// const masterController = require("./../controllers/masterController")(
//   Person,
//   OTP,
//   Onboarding,
//   HiringCenter
// );
// var webController = require("../controllers/webController")(Onboarding);
// var personController = require("../controllers/personController")(Person);

// // api's without JWT token
// masterRouter
//   .route("/verifyMobileNumber")
//   .post(masterController.verifyMobileNumber);
// masterRouter
//   .route("/validateOTP")
//   .post(masterController.validateOTPAsyncAwait);
// masterRouter
//   .route("/fetchUserDetails/:id/:otp")
//   .get(webController.fetchUserDetails);
// masterRouter
//   .route("/getImage")
//   .get(webController.getS3Image);

// module.exports = masterRouter;
