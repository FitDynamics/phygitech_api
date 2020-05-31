const express = require("express");
const masterRouter = express.Router();

//  #Models
var Admin = require("./../models/adminModel");
var Classroom = require("./../models/classroomModel");
var Branch = require("./../models/branchModel");
var Parent = require("./../models/parentModel");
var Student = require("./../models/studentModel");
var Teacher = require("./../models/teacherModel");
var Organization = require("../models/organizationModel");

// #admin
var adminController = require("./../controllers/adminController")(Admin);
masterRouter.route("/admin").post(adminController.addAdmin);
masterRouter.route("/admin").get(adminController.getAdmin);
masterRouter.route("/admin/{id}").get(adminController.getAdminByID);
masterRouter.route("/admin/{id}").put(adminController.updateAdmin);
masterRouter.route("/admin/{id}").delete(adminController.removeAdmin);

// #admin
var branchController = require("./../controllers/branchController")(Branch);
masterRouter.route("/branch").post(branchController.addBranch);
masterRouter.route("/branch").get(branchController.getBranch);
masterRouter.route("/branch/{id}").get(branchController.getBranchByID);
masterRouter.route("/branch/{id}").put(branchController.updateBranch);
masterRouter.route("/branch/{id}").delete(branchController.removeBranch);

// #class
var classroomController = require("../controllers/classroomController")(Classroom);
masterRouter.route("/classroom").post(classroomController.addClassroom);
masterRouter.route("/classroom").get(classroomController.getClassroom);
masterRouter.route("/classroom/{id}").get(classroomController.getClassroomByID);
masterRouter.route("/classroom/{id}").put(classroomController.updateClassroom);
masterRouter.route("/classroom/{id}").delete(classroomController.removeClassroom);

// #organisation
var organizationController = require("../controllers/organizationController")(Organization);
masterRouter.route("/organization").post(organizationController.addOrganization);
masterRouter.route("/organization").get(organizationController.getOrganization);
masterRouter.route("/organization/{id}").get(organizationController.getOrganizationByID);
masterRouter.route("/organization/{id}").put(organizationController.updateOrganization);
masterRouter.route("/organization/{id}").delete(organizationController.removeOrganization);


// #parent
var parentController = require("./../controllers/parentController")(Parent);
masterRouter.route("/parent").post(parentController.addParent);
masterRouter.route("/parent").get(parentController.getParent);
masterRouter.route("/parent/{id}").get(parentController.getParentByID);
masterRouter.route("/parent/{id}").put(parentController.updateParent);
masterRouter.route("/parent/{id}").delete(parentController.removeParent);

// #student
var studentController = require("./../controllers/studentController")(Student);
masterRouter.route("/student").post(studentController.addStudent);
masterRouter.route("/student").get(studentController.getStudent);
masterRouter.route("/student/{id}").get(studentController.getStudentByID);
masterRouter.route("/student/{id}").put(studentController.updateStudent);
masterRouter.route("/student/{id}").delete(studentController.removeStudent);

// #teacher
var teacherController = require("./../controllers/teacherController")(Teacher);
masterRouter.route("/teacher").post(teacherController.addTeacher);
masterRouter.route("/teacher").get(teacherController.getTeacher);
masterRouter.route("/teacher/{id}").get(teacherController.getTeacherByID);
masterRouter.route("/teacher/{id}").put(teacherController.updateTeacher);
masterRouter.route("/teacher/{id}").delete(teacherController.removeTeacher);


module.exports = masterRouter;
