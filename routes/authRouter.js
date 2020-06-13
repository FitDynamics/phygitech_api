const express = require("express");
const authRouter = express.Router();

//  #Models
var User = require("./../models/userModel");
var Admin = require("./../models/adminModel");
var Classroom = require("./../models/classroomModel");
var Branch = require("./../models/branchModel");
var Parent = require("./../models/parentModel");
var Student = require("./../models/studentModel");
var Teacher = require("./../models/teacherModel");
var Session = require("./../models/sessionModel")
var Content = require("./../models/contentModel")
var Organization = require("../models/organizationModel");

// #master
const masterController = require('../controllers/masterController');
authRouter.post('/signup', masterController.signup);
authRouter.post('/login', masterController.login);

// #user
var userController = require("./../controllers/userController")(User);
authRouter.get("/users", masterController.allowIfLoggedin, masterController.grantAccess('readAny', 'user'), userController.getUsers);
authRouter.get("/user", masterController.allowIfLoggedin, masterController.grantAccess('readAny', 'user'), userController.getUserById);
authRouter.put("/user/:userId", masterController.allowIfLoggedin, masterController.grantAccess('updateAny', 'user'), userController.updateUser);
authRouter.delete("/user/:userId", masterController.allowIfLoggedin, masterController.grantAccess('deleteAny', 'user'), userController.removeUser);

// #admin
var adminController = require("./../controllers/adminController")(Admin);
authRouter.post("/admin", adminController.addAdmin);
authRouter.get("/admin/:orgId", adminController.getAdminByOrgID);
authRouter.get("/adminbranch/:branchId", adminController.getAdminByBranchID);

authRouter.get("/admins", masterController.allowIfLoggedin, masterController.grantAccess('readAny', 'admin'), adminController.getAdmin);
authRouter.get("/admin", masterController.allowIfLoggedin, masterController.grantAccess('readOwn', 'admin'), adminController.getAdminByID);
authRouter.put("/admin/:adminId", masterController.allowIfLoggedin, masterController.grantAccess('updateAny', 'admin'), adminController.updateAdmin);
authRouter.delete("/admin/:adminId", masterController.allowIfLoggedin, masterController.grantAccess('deleteAny', 'admin'), adminController.removeAdmin);

// #admin
var branchController = require("./../controllers/branchController")(Branch);
authRouter.post("/branch", branchController.addBranch);
authRouter.get("/branches/:orgId", branchController.getBranchByOrgID)
authRouter.get("/branches", masterController.allowIfLoggedin, masterController.grantAccess('readAny', 'branch'), branchController.getBranch);
authRouter.get("/branch", masterController.allowIfLoggedin, masterController.grantAccess('readOwn', 'branch'), branchController.getBranchByID);
authRouter.put("/branch/:branchId", masterController.allowIfLoggedin, masterController.grantAccess('updateAny', 'branch'), branchController.updateBranch);
authRouter.delete("/branch/:branchId", masterController.allowIfLoggedin, masterController.grantAccess('deleteAny', 'branch'), branchController.removeBranch);

// #class
var classroomController = require("../controllers/classroomController")(Classroom, Teacher);
authRouter.post("/classroom", classroomController.addClassroom);
authRouter.get("/classrooms", classroomController.getClassroom);
authRouter.get("/classroom", masterController.allowIfLoggedin, masterController.grantAccess('readOwn', 'classroom'), classroomController.getClassroomByID);
authRouter.put("/classroom/:roomId", masterController.allowIfLoggedin, masterController.grantAccess('updateAny', 'classroom'), classroomController.updateClassroom);
authRouter.delete("/classroom/:roomId", masterController.allowIfLoggedin, masterController.grantAccess('deleteAny', 'classroom'), classroomController.removeClassroom);

// #organisation
var organizationController = require("../controllers/organizationController")(Organization);
authRouter.post("/organization", organizationController.addOrganization);
authRouter.get("/organizations", organizationController.getOrganization);
authRouter.get("/organization", masterController.allowIfLoggedin, masterController.grantAccess('readOwn', 'organization'), organizationController.getOrganizationByID);
authRouter.put("/organization/:orgId", masterController.allowIfLoggedin, masterController.grantAccess('updateAny', 'organization'), organizationController.updateOrganization);
authRouter.delete("/organization/:orgId", masterController.allowIfLoggedin, masterController.grantAccess('deleteAny', 'organization'), organizationController.removeOrganization);


// #parent
var parentController = require("./../controllers/parentController")(Parent);
authRouter.post("/parent", masterController.allowIfLoggedin, masterController.grantAccess('updateAny', 'parent'), parentController.addParent);
authRouter.get("/parents", masterController.allowIfLoggedin, masterController.grantAccess('readAny', 'parent'), parentController.getParent);
authRouter.get("/parent", masterController.allowIfLoggedin, masterController.grantAccess('readOwn', 'parent'), parentController.getParentByID);
authRouter.put("/parent/:parentId", masterController.allowIfLoggedin, masterController.grantAccess('updateAny', 'parent'), parentController.updateParent);
authRouter.delete("/parent/:parentId", masterController.allowIfLoggedin, masterController.grantAccess('deleteAny', 'parent'), parentController.removeParent);

// #student
var studentController = require("./../controllers/studentController")(Student, Classroom);
authRouter.post("/student", studentController.addStudent);
authRouter.get("/students", studentController.getStudent);
authRouter.get("/student", masterController.allowIfLoggedin, masterController.grantAccess('readOwn', 'student'), studentController.getStudentByID);
authRouter.put("/student/:studentId", masterController.allowIfLoggedin, masterController.grantAccess('updateAny', 'student'), studentController.updateStudent);
authRouter.delete("/student/:studentId", masterController.allowIfLoggedin, masterController.grantAccess('deleteAny', 'student'), studentController.removeStudent);

// #teacher
var teacherController = require("./../controllers/teacherController")(Teacher, Classroom);
authRouter.post("/teacher", teacherController.addTeacher);
authRouter.get("/teachers", teacherController.getTeacher);
authRouter.get("/teacher", masterController.allowIfLoggedin, masterController.grantAccess('readOwn', 'teacher'), teacherController.getTeacherByID);
authRouter.put("/teacher/:teacherId", masterController.allowIfLoggedin, masterController.grantAccess('updateAny', 'teacher'), teacherController.updateTeacher);
authRouter.delete("/teacher/:teacherId", masterController.allowIfLoggedin, masterController.grantAccess('deleteAny', 'teacher'), teacherController.removeTeacher);


// #session 
var sessionController = require("./../controllers/sessionController")(Session);
authRouter.post("/session", sessionController.createSession);
authRouter.get("/sessions", sessionController.getSession)

// content
var contentController = require("./../controllers/contentController")(Content);
authRouter.get("/content", contentController.getContent)
authRouter.get("/studentcontent", contentController.getContentByCategory)

module.exports = authRouter;
