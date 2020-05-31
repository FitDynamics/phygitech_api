var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

var Classroom = mongoose.Schema({
    name: { type : String, required : true }, 
    teachersList: [ObjectId],
    classTeacher: { type: ObjectId, ref: 'Teacher'},
    branch: {type: ObjectId, ref: 'Branch'},
    status: { type : String, default: "active"}, // active | inactive
    category: String // pre-primary, primary, 
});

module.exports = mongoose.model("Classroom", Classroom, "classroom");

