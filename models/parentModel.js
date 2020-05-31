var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

var Parent = mongoose.Schema({
    name: String,
    gender: String,
    age: Number,
    mobileNo: Number,
    email: String,
    occupation: String,
    photoURL: String,
    student: { type: ObjectId, ref: 'Student' },
    relation: String,
    status: { type : String, default: "active"} // active | inactive
});

module.exports = mongoose.model("Parent", Parent, "parent");

