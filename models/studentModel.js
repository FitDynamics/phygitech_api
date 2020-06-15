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

var Student = mongoose.Schema({
    name: String,
    gender: String,
    DOB: Date,
    mobileNo: Number, //  optional
    emergencyContact: Number,
    email: String,
    photoURL: String,
    address: addressModel,
    class: { type: ObjectId, ref: 'Classroom' },
    status: { type : String, default: "active"} // active | inactive
});

module.exports = mongoose.model("Student", Student, "student");

