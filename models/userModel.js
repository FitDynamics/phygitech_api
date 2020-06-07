const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const UserModel = new Schema({
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, default: 'basic', enum: ["super-admin", "branch-admin", "teacher", "parent", "student", "basic"] },
    accessToken: String
});
 
module.exports = mongoose.model('userModel', UserModel, 'user');