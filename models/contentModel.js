var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

var Content = mongoose.Schema({
    name: { type : String , required : true },
    URL: String,
    category: String, // pre-primary | primary | secondary | sr-secondary
    status: { type : String, default: "active"} // active | inactive
});

module.exports = mongoose.model("Content", Content, "content");

