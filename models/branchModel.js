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

const PointSchema = new mongoose.Schema({
    type: { 
        type: String, 
        default: 'Point' 
    },
    coordinates: { 
        type: [Number], 
        index: { type: '2dsphere', sparse: false }, 
        required: true 
    }
});

var Branch = mongoose.Schema({
    name: { type : String, unique : true, required : true },
    location: PointSchema,
    address: addressModel,
    email: String,
    phoneList: [Number],
    organization: { type: ObjectId,  ref: 'Organization' },
    status: { type : String, default: "active"} // active | inactive
});

module.exports = mongoose.model("Branch", Branch, "branch");

