var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

var Admin = mongoose.Schema({
    name: { type : String , required : true },
    mobileNo: { type : Number , unique : true, required : true },
    email: { type : String , unique : true, required : true },
    accessLevel: { type: [ObjectId], ref: 'Branch' },
    orgAccess: { type: ObjectId, ref: 'Organization' },
    role: { type : String , required : true }, // superAdmin | orgAdmin | branchAdmin
    status: { type : String, default: "active"} // active | inactive
});

module.exports = mongoose.model("Admin", Admin, "admin");

