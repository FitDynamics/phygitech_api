
const User = require('../models/userModel');
const Organization = require("../models/organizationModel");
const Classroom = require("../models/classroomModel");
const Student = require("../models/studentModel");

const orgController = require('../controllers/organizationController')(Organization);
const studentController = require('../controllers/studentController')(Student, Classroom);

const logger = require("../commons/logger")('masterController');
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
    var responseata = { 
      email: user.email, 
      role: user.role
    };
    const filterObj = { 
      email: user.email 
    };
    if (user.role === "org-admin") {
      const details = await orgController.fetchOrganizationDetails(filterObj);
      console.log(details)
      responseata = {
        orgID: details._id,
        email: user.email, 
        role: user.role
      }
    } else if (user.role === "student"){
      const details = await studentController.fetchStudentDetails(filterObj);
      console.log(details)
      responseata = {
        studentID: details._id,
        email: user.email, 
        role: user.role
      }
    } else if (user.role === "teacher"){
      const details = await orgController.fetchTeacherDetails(filterObj);
      console.log(details)
      responseata = {
        teacherID: details._id,
        email: user.email, 
        role: user.role
      }
    } else if (user.role === "branch-admin"){
      const details = await orgController.fetchBranchDetails(filterObj);
      console.log(details)
      responseata = {
        branchID: details._id,
        email: user.email, 
        role: user.role
      }
    }
    res.status(200).json({
      data: responseata,
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