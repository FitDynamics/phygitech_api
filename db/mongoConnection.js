const mongoose = require('mongoose');
const config = require("./../config/config");
const logger = require("../commons/logger")('mongoConnection');

//mongoose support callback by default means they return callback, to return as promises we use below line
mongoose.Promise = global.Promise;

const uri = "mongodb+srv://test-admin:test1234@cluster0-z4nl7.mongodb.net/test?retryWrites=true&w=majority"
//console.log("url", uri)

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, function (err) {
    if (err) {
        logger.error('mongooseConnection - Error while connecting to db : ', err);
    } else {
        logger.info("connected successfully to database");
    }
});
mongoose.set('useCreateIndex', true);
module.exports = {
    mongoose //this will return the mongoose object
};
