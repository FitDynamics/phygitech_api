var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

var addressModel = new mongoose.Schema({
    line1: String,
    line2: String, //optional
    line3: String, //optional
    city: String,
    state: String,
    pinCode: Number
});

var Teacher = mongoose.Schema({
    name: String,
    gender: String,
    DOB: Date,
    DOJ: Date,
    yearsOfExp: Number, // At the time of joining
    mobileNo: Number, //  optional
    emergencyContact: Number,
    email: String,
    photoURL: String,
    address: addressModel,
    class: { type: ObjectId, ref: 'Class' },
    status: { type : String, default: "active"}, // active | inactive
    subjectSpeciality: [String] //probably we should use subject model
});

module.exports = mongoose.model("Teacher", Teacher, "teacher");

