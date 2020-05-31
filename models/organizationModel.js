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

var Organization = mongoose.Schema({
    legalEntityName: { type : String, unique : true, required : true },
    legalEntityType: String,
    displayName: String,
    logoURL: String,
    address: addressModel,
    email: String,
    contactNo: Number,
    status: { type : String, default: "active"} // active | inactive
});

module.exports = mongoose.model("Organization", Organization, "organization");

