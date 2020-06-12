var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

var Session = mongoose.Schema({
    name: { type : String , required : true },
    scheduledDate: Date,
    startTime: Date,
    endTime: Date,
    classroom: { type: ObjectId, ref: 'Classroom' },
    noOfAttendies: Number,
    uniqueMeetingId: Number,
    recordingURL: String
});

module.exports = mongoose.model("Session", Session, "session");

