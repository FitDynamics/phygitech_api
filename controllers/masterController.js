// const config = require("./../config/config");
// const jwt = require('jsonwebtoken');
// const dbUtil = require('./../commons/dbUtil');
// const logger = require("../commons/logger")('masterController');
// const S3 = require("../commons/signedUrlS3");
// const S3Util = new S3();
// const chalk = require('chalk');
// const getMongoDbId = require("mongodb").ObjectID;
// const moment = require('moment')

// let masterController = function (Person, OTP, Onboarding, HiringCenter, Settings, Job) {

//     var ua = require("./../commons/userAuthentication")(OTP);
//     var personController = require("./../controllers/personController")(Person);
//     //const jobController = require("./jobController")(Job, Application);

//     const fetchAppSetting = async function (settingType) {
//         logger.debug('fetchAppSetting called. Setting Type: ', settingType);
//         return new Promise((resolve, reject) => {
//             let filterObj = { type: settingType };
//             Settings.findOne(filterObj, (err, docs) => {
//                 if (err) {
//                     logger.error('fetchAppSetting failed : ', err);
//                     reject(err);
//                 }
//                 logger.debug('fetchAppSetting done. ');
//                 resolve(docs);
//             })
//         })
//     };

//     const generateJWT = async function (userId) {
//         logger.debug(chalk.blue('[' + userId + '] ') + 'generateJWT called.');
//         return new Promise((resolve, reject) => {
//             if (userId) {
//                 const token = jwt.sign({ _id: userId }, config.TOKEN);
//                 logger.debug(chalk.blue('[' + userId + '] ') + 'generateJWT done. JWT Token: ' + token);
//                 resolve(token);
//             }
//             else {
//                 logger.error('generateJWT failed : error generating JWT');
//                 reject("error generating userId");
//             }
//         });
//     }

//     // verify mobile number and send OTP
//     const verifyMobileNumber = async function (req, res) {
//         try {
//             logger.info('verifyMobileNumber called.');
//             logger.debug('verifyMobileNumber called. Mobile Number: ' + req.body.mobileNo);
//             if (!req.body.mobileNo) {
//                 logger.error('verifyMobileNumber failed : mobile Number invalid');
//                 throw ("mobile Number invalid");
//             }

//             await ua.checkUserExist(req.body.mobileNo);
//             let data = await ua.verifyMobileNumber(req.body.mobileNo);
//             logger.info('verifyMobileNumber done.');
//             logger.debug('verifyMobileNumber done.' + req.body.mobileNo);
//             res.status(200).send({
//                 status: "success",
//                 message: "OTP has been sent to mobile. "
//             });
//         }
//         catch (err) {
//             logger.error('verifyMobileNumber failed : ', err);
//             res.status(500).send({
//                 status: "failed",
//                 message: err.message
//             });
//         }
//     };

//     // Validate OTP and return JWT
//     async function validateOTPAndGenerateToken(mobileNo, otp, channelId, agentId, date) {
//         try {
//             logger.debug('validateOTPAndGenerateToken called. Mobile Number: ' + mobileNo + ' Mobile Number otp: ' + otp + ' Channel Id: ' + channelId + ' Agent Id: ' + agentId);
//             await ua.validateOTP(mobileNo, otp);
//             const userId = await personController.saveFirstSuccessLoginAttempt(mobileNo, channelId, agentId, date);
//             const token = await generateJWT(userId);
//             logger.debug('validateOTPAndGenerateToken done. JWT token: ', token);
//             return token;
//         }
//         catch (err) {
//             logger.error('validateOTPAndGenerateToken failed : ', err);
//             throw err;
//         }
//     }

//     const validateOTPAsyncAwait = function (req, res) {
//         (async function () {
//             try {
//                 logger.info('validateOTPAsyncAwait called.');
//                 logger.debug('validateOTPAsyncAwait called. Request Body: ' + JSON.stringify(req.body, null, 2) + 'Request Query: ' + JSON.stringify(req.body, null, 2));
//                 let userDetails = await (personController.setPersonBasicInfo(req));

//                 const token = await (validateOTPAndGenerateToken(req.body.mobileNo, req.body.otp, userDetails.channelId, userDetails.referredBy, userDetails.firstLoginSuccessDate));
//                 let userLocation;
//                 let docs = { longitude: null, latitude: null };
//                 if (req.query.latitude || req.query.longitude) {
//                     docs.longitude = req.query.longitude;
//                     docs.latitude = req.query.latitude;
//                 }
//                 if (!docs.latitude) {
//                     //console.log("shouldn't");
//                     docs.longitude = 77.6119;
//                     docs.latitude = 12.9738;
//                 }
//                 let status;
//                 if (docs.longitude && docs.latitude) {
//                     userLocation = {
//                         type: "Point",
//                         coordinates: [Number(docs.longitude), Number(docs.latitude)]
//                     };
//                 }
//                 // console.log("userLocation")
//                 if (req.query.jobStatus) {
//                     status = req.query.jobStatus;
//                 } else {
//                     status = "active";
//                 }
//                 // let promises = [];
//                 // promises.push(
//                 //     jobController.fetchAllJobs(userLocation, status)
//                 // );
//                 // promises.push(
//                 //     jobController.fetchAppliedJobs(userDetails._id)
//                 // );
//                 // let [jobs, appliedJobs] = await Promise.all(
//                 //     promises
//                 // );
//                 // console.log(jobs);

//                 let hiringRes = await getHiringCenterDetails({ _id: getMongoDbId(userDetails.hiringCenterId) })

//                 var finaldata = {
//                     token: token,
//                     userName: userDetails.name,
//                     userFullDetails: userDetails,
//                     hiringCenterDetails: hiringRes || {}
//                     // jobs,
//                     // appliedJobs
//                 };
//                 // finaldata.jobs = jobController.removeAppliedJobs(
//                 //     finaldata.jobs,
//                 //     finaldata.appliedJobs
//                 // );
//                 logger.info('validateOTPAsyncAwait done.');
//                 logger.debug('validateOTPAsyncAwait done. Mobile Number: ' + req.body.mobileNo + ' otp generated: ' + req.body.otp);
//                 res.send({
//                     status: "success",
//                     message: "Entered OTP is correct",
//                     data: finaldata
//                 });
//             } catch (err) {
//                 logger.error('validateOTPAsyncAwait failed : ', err);
//                 res.send({ status: "failed", message: err.message });
//             }

//         })();
//     };

//     const getSignedUrlToWrite = async (req) => {
//         try {
//             logger.info(chalk.green(' [' + req.user + '] ') + 'getSignedUrlToWrite called.');
//             logger.debug(chalk.blue('[' + req.user + '] ') + 'getSignedUrlToWrite called.');
//             req.user = String(req.user).split("").reverse().join("");
//             const path = req.body.path + "/" + req.user;
//             const operation = 'putObject'
//             const url = await S3Util.getS3SignedUrl(operation, path);
//             logger.info(chalk.green(' [' + req.user + '] ') + 'getSignedUrlToWrite done.');
//             logger.debug(chalk.blue('[' + req.user + '] ') + 'getSignedUrlToWrite done.');
//             res.send({
//                 status: "success",
//                 data: url
//             })
//         }
//         catch (err) {
//             logger.error('getSignedUrlToWrite failed : ', err);
//             res.send({
//                 status: "failed",
//                 message: err.message
//             })
//         }
//     }

//     const getSignedUrlToRead = async (req) => {
//         try {
//             logger.info(chalk.green(' [' + req.user + '] ') + 'getSignedUrlToRead called.');
//             logger.debug(chalk.blue('[' + req.user + '] ') + 'getSignedUrlToRead called.');
//             req.user = String(req.user).split("").reverse().join("");
//             const path = req.body.path + "/" + req.user;
//             const operation = 'getObject'
//             const url = await S3Util.getS3SignedUrl(operation, path);
//             logger.info(chalk.green(' [' + req.user + '] ') + 'getSignedUrlToRead done.');
//             logger.debug(chalk.blue('[' + req.user + '] ') + 'getSignedUrlToRead done.');
//             res.send({
//                 status: "success",
//                 data: url
//             })
//         }
//         catch (err) {
//             logger.error('getSignedUrlToRead failed : ', err);
//             res.send({
//                 status: "failed",
//                 message: err.message
//             })
//         }
//     }



//     const resendOTP = function (req, res) {
//         logger.info('resendOTP called.');
//         logger.debug('resendOTP called. Mobile Number: ' + req.body.mobileNo);
//         return verifyMobileNumber(req, res);
//     };

//     const fetchSetting = async function (req, res) {
//         try {
//             logger.info('fetchSetting called.');
//             logger.debug('fetchSetting called. Setting Type: ' + req.params.settingType);
//             let settingType = req.params.settingType;
//             let doc = await fetchAppSetting(settingType);
//             logger.info('fetchSetting done.');
//             logger.debug('fetchSetting done.');
//             res.send({
//                 status: "success",
//                 data: doc
//             });
//         } catch (err) {
//             logger.error('fetchSetting failed : ', err);
//             res.status(500).send({
//                 status: "failed",
//                 message: err.message
//             });
//         }
//     };

//     const setUrl = (docs) => {
//         return new Promise((resolve, reject) => {
//             try {
//                 logger.info('setUrl called.');
//                 logger.debug('setUrl called.');
//                 let i = 0;
//                 for (each in docs) {
//                     i++;
//                     docs[each].hiringCenterUrl = "https://b2c-jobsapi.betterplace.co.in/hiringCenterWeb/" + docs[each]._id
//                 }
//                 if (i == docs.length) {
//                     logger.info('setUrl done.');
//                     logger.debug('setUrl done.');
//                     resolve(docs);
//                 }
//             }
//             catch (err) {
//                 logger.error('setUrl failed : ', err);
//                 reject(err)
//             }
//         })
//     }


//     const fetchHiringCenters = function (req, res) {
//         try {
//             logger.info(chalk.green(' [' + req.user + '] ') + 'fetchHiringCenters called.');
//             logger.debug(chalk.blue('[' + req.user + '] ') + 'fetchHiringCenters called.');
//             HiringCenter.find()
//                 .lean()
//                 .exec(async (err, docs) => {
//                     try {
//                         if (err) {
//                             logger.error('fetchHiringCenters failed : ', err);
//                             throw err;
//                         }
//                         const hiring = await setUrl(docs)
//                         let headers = ["_id", "companyName", "city", "areaName", "address", "pocContact", "pocName", "hiringCenterUrl"]
//                         logger.info(chalk.green(' [' + req.user + '] ') + 'fetchHiringCenters done.');
//                         logger.debug(chalk.blue('[' + req.user + '] ') + 'fetchHiringCenters done.');
//                         res.xls("jobApplications.xlsx", hiring, {
//                             fields: headers
//                         });
//                     }
//                     catch (err) {
//                         res.send(err.message)
//                     }
//                 })
//         }
//         catch (err) {
//             res.send({
//                 message: "failed to generate hiring centers excel"
//             })
//         }
//     }





//     const getHiringCenterDetails = function (filterObj) {
//         logger.info(chalk.green('Get Hiring Center called.'));

//         return new Promise((resolve, reject) => {
//             HiringCenter.findOne(filterObj, function (err, result) {
//                 if (err) {
//                     logger.error('Get Hiring Center failed : ', err);
//                     reject({ message: err })
//                 }
//                 logger.info(chalk.green('Get Hiring Center done'));
//                 resolve(result);
//             });
//         })
//     }

//     const validateID = function (req, res) {
//         (async function () {
//             try {
//                 logger.info('validateID called.');
//                 logger.debug('validateID called. Request Body: ' + JSON.stringify(req.body, null, 2));

//                 const token = await validateOTPAndGenerateToken(req.body.email, req.body.pwd);


//                 //let userDetails = await personController.setPersonBasicInfo(req);
//                 let orgDetails = await getHiringCenterDetails({ _id: getMongoDbId(userDetails.hiringCenterId) })

//                 var finaldata = {
//                     token: token,
//                     //userFullDetails: userDetails,
//                     organizationDetails: orgDetails || {}
//                 };

//                 logger.info('validateID done.');
//                 logger.debug('validateID done. Mobile Number: ' + req.body.mobileNo + ' otp generated: ' + req.body.otp);
//                 res.send({
//                     status: "success",
//                     data: finaldata
//                 });
//             } catch (err) {
//                 logger.error('validateID failed : ', err);
//                 res.send({ status: "failed", message: err.message });
//             }

//         })();
//     };



//     return {
//         getSignedUrlToRead,
//         getSignedUrlToWrite,
//         verifyMobileNumber,
//         validateOTPAsyncAwait,
//         resendOTP,
//         fetchSetting,
//         fetchHiringCenters,
//         validateID
//     }

// };
// module.exports = masterController;

const logger = require("../commons/logger")('masterController');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { roles } = require('../roles');

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

exports.signup = async (req, res, next) => {
  try {
    logger.info('signup called.');
    const { email, password, role } = req.body
    logger.debug('signup called. email: ' + email);
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ email, password: hashedPassword, role: role || "basic" });
    const accessToken = jwt.sign({ userId: newUser._id, email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d"
    });
    newUser.accessToken = accessToken;
    await newUser.save();
    logger.debug('signup done. newUser: ' + newUser.email);
    logger.info('signup done.');
    res.json({
      data: { email: newUser.email, role: newUser.role },
      accessToken
    })
  } catch (error) {
    next(error)
  }
}
exports.login = async (req, res, next) => {
  try {
    logger.info('login called.');
    const { email, password } = req.body;
    logger.debug('login called. email: ' + email);
    const user = await User.findOne({ email, status: "active" });
    if (!user) return next(new Error('Email does not exist'));
    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) return next(new Error('Password is not correct'))
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d"
    });
    await User.findByIdAndUpdate(user._id, { accessToken })
    logger.debug('login done. newUser: ' + user.email);
    logger.info('login done.');
    res.status(200).json({
      data: { email: user.email, role: user.role },
      accessToken
    })
  } catch (error) {
    next(error);
  }
}


exports.grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      logger.debug('grantAccess called. permission granted :'+permission.granted);
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action"
        });
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}

exports.allowIfLoggedin = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser;
    logger.debug('allowIfLoggedin called.'+user);
    if (!user)
      return res.status(401).json({
        error: "You need to be logged in to access this route"
      });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}