const logger = require("../commons/logger")('adminController');
const chalk = require('chalk');

//create, read, update, delete admin
let adminController = function (Admin) {

    const addAdmin = async (req, res) => {
        logger.info('addAdmin called.');
        logger.debug('addAdmin called.' + JSON.stringify(req.body));
        Admin.create(req.body, function (err, data) {
          if (err || !data) {
            logger.error('addAdmin failed : ', err);
            res.status(500);
            res.send(err);
          }
          else {
            logger.info('addAdmin done.');
            logger.debug('addAdmin done.' + JSON.stringify(data));
            res.status(200);
            res.send("success");
          }
        });
    };

    const getAdmin = async (req, res) => {
        logger.info('getAdmin called.');
        Admin.find(function (err, data) {
          if (err || !data) {
            logger.error('getAdmin failed : ', err);
            res.status(500);
            res.send(err);
          }
          else {
            logger.info('getAdmin done.');
            logger.debug('getAdmin done.', data);
            res.status(200);
            res.send(data);
          }
        });
    };

    const getAdminByID = async (req, res) => {
        logger.info('getAdminByID called.');
        try {
          const user = res.locals.loggedInUser;
          logger.debug('getAdminByID called. Email ID: ' + user.email );
          const details = await fetchAdminDetails(user.email);
          logger.info('getAdminByID done.');
          logger.debug('getAdminByID done. Admin Details: ' + JSON.stringify(details, null, 2));
          res.status(200).send({
              status: "success",
              data: details
          })
        }
        catch (err) {
            logger.error('getAdminByID failed : ', err);
            res.send({
                status: "failed",
                message: err.message
            })
        }
    };

    const updateAdmin = async (req, res) => {
        logger.info('updateAdmin called.');
        logger.debug('updateAdmin called. Admin ID: ' + req.params.id );
        try {
            const details = await saveAdmin(req.params.id, req.body.updatedJson);
            logger.info('updateAdmin done.');
            logger.debug('updateAdmin done. Admin Details: ' + JSON.stringify(details, null, 2));
            res.status(200).send({
                status: "success",
                data: details
            })
        }
        catch (err) {
            logger.error('updateAdmin failed : ', err);
            res.send({
                status: "failed",
                message: err.message
            })
        }
    };

    const removeAdmin = async (req, res) => {
        logger.info('removeAdmin called.');
        logger.debug('removeAdmin called. Admin ID:', req.params.id);
        const filterObj = { 
            _id: req.params.id 
        };
        Admin.deleteOne(filterObj, function (err, data) {
          if (err || !data) {
            logger.error('removeAdmin failed : ', err);
            res.status(500);
            res.send(err);
          }
          else {
            logger.info('removeAdmin done.');
            res.status(200);
            res.send("deleted");
          }
        });
    };

    const fetchAdminDetails = (emailId) => {
        logger.info('fetchAdminDetails called.');
        logger.debug('fetchAdminDetails called. Admin Id: ' + emailId);
        return new Promise((resolve, reject) => {
            const filterObj = { 
                email: emailId 
            };
            Admin.findOne(filterObj).exec(async (err, res) => {
                if (err) {
                    logger.error('fetchAdminDetails failed : ', err);
                    reject(err);
                }
                logger.info('fetchAdminDetails done.');
                logger.debug('fetchAdminDetails done. ' + JSON.stringify(res, null, 2));
                resolve(res);
            })
        })
    };

    const saveAdmin = (adminID, updatedJson) => {
        logger.info('saveAdmin called.');
        logger.debug('saveAdmin called. Updated Json: ' + updatedJson);
        return new Promise((resolve, reject) => {
          const filterObj = { _id: adminID};
          Person.findOneAndUpdate(filterObj, updatedJson, async (err, result) => {
            if (err) {
              logger.error('saveAdmin failed : ', err);
              return reject(err);
            }
            logger.debug('saveAdmin done.'+result._id);
            resolve(result._id);
          });
        });
    };

    return {
        addAdmin,
        getAdmin,
        getAdminByID,
        updateAdmin,
        removeAdmin
    };
};

module.exports = adminController;