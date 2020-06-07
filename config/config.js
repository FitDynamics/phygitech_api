const config = {
    port: process.env.SERVER_PORT,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    baseUrlS3: process.env.BASE_URL_S3,
    bucketS3: process.env.S3_BUCKET,
    bucketS3SFTP: process.env.S3_SFTP_BUCKET,
    mongooseUri: process.env.MONGO_URI,
    logLevel: process.env.LOG_LEVEL,
    TOKEN: process.env.JWT_SECRET_KEY,
    secretCryptoKey: process.env.CRYPTO_SECRET_KEY
  };
  module.exports = config;


  // export SERVER_PORT=3000
  // export JWT_SECRET_KEY='test'
  // export MONGO_URI='mongodb+srv://test-admin:Admin1111@cluster0-z4nl7.mongodb.net/test?retryWrites=true&w=majority'
  // export LOG_LEVEL='debug'
  