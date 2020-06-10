const config = {
    port: process.env.SERVER_PORT,
    mongooseUri: process.env.MONGO_URI,
    logLevel: process.env.LOG_LEVEL,
    TOKEN: process.env.JWT_SECRET_KEY
  };
  module.exports = config;


  // export SERVER_PORT=3000
  // export JWT_SECRET_KEY='test'
  // export MONGO_URI='mongodb+srv://test-admin:Admin1111@cluster0-z4nl7.mongodb.net/test?retryWrites=true&w=majority'
  // export LOG_LEVEL='debug'
  