const logger = require("../commons/logger")('organizationController');
const chalk = require('chalk');

//create, update city
let organizationController = function (Organization) {

  const addOrganization = async (req, res) => {
    logger.info('addOrganization called.');
    logger.debug('addOrganization called.', req.body.data);
    Organization.create(req.body.data, function (err, data) {
      if (err || !data) {
        logger.error('addOrganization failed : ', err);
        res.status(500);
        res.send(err);
      }
      else {
        logger.info('addOrganization done.');
        res.status(200);
        res.send("success");
      }
    });
};

const getOrganization = async (req, res) => {
    logger.info('getOrganization called.');
    Organization.find(function (err, data) {
      if (err || !data) {
        logger.error('getOrganization failed : ', err);
        res.status(500);
        res.send(err);
      }
      else {
        logger.info('getOrganization done.');
        logger.debug('getOrganization done.', data);
        res.status(200);
        res.send(data);
      }
    });
};

const getOrganizationByID = async (req, res) => {
    logger.info('getOrganizationByID called.');
    logger.debug('getOrganizationByID called. Organization ID: ' + req.params.id );
    try {
        const details = await fetchOrganizationDetails(req.params.id);
        logger.info('getOrganizationByID done.');
        logger.debug('getOrganizationByID done. Organization Details: ' + JSON.stringify(details, null, 2));
        res.status(200).send({
            status: "success",
            data: details
        })
    }
    catch (err) {
        logger.error('getOrganizationByID failed : ', err);
        res.send({
            status: "failed",
            message: err.message
        })
    }
};

const updateOrganization = async (req, res) => {
    logger.info('updateOrganization called.');
    logger.debug('updateOrganization called. Organization ID: ' + req.params.id );
    try {
        const details = await saveOrganization(req.params.id, req.body.updatedJson);
        logger.info('updateOrganization done.');
        logger.debug('updateOrganization done. Organization Details: ' + JSON.stringify(details, null, 2));
        res.status(200).send({
            status: "success",
            data: details
        })
    }
    catch (err) {
        logger.error('updateOrganization failed : ', err);
        res.send({
            status: "failed",
            message: err.message
        })
    }
};

const removeOrganization = async (req, res) => {
    logger.info('removeOrganization called.');
    logger.debug('removeOrganization called. Organization ID:', req.params.id);
    const filterObj = { 
        _id: req.params.id 
    };
    Organization.deleteOne(filterObj, function (err, data) {
      if (err || !data) {
        logger.error('removeOrganization failed : ', err);
        res.status(500);
        res.send(err);
      }
      else {
        logger.info('removeOrganization done.');
        res.status(200);
        res.send("deleted");
      }
    });
};

const fetchOrganizationDetails = (organizationId) => {
    logger.info('fetchOrganizationDetails called.');
    logger.debug('fetchOrganizationDetails called. Organization Id: ' + organizationId);
    return new Promise((resolve, reject) => {
        const filterObj = { 
            _id: organizationId 
        };
        Organization.findOne(filterObj).exec(async (err, res) => {
            if (err) {
                logger.error('fetchOrganizationDetails failed : ', err);
                reject(err);
            }
            logger.info('fetchOrganizationDetails done.');
            logger.debug('fetchOrganizationDetails done. ' + JSON.stringify(res, null, 2));
            resolve(res);
        })
    })
};

const saveOrganization = (organizationID, updatedJson) => {
    logger.info('saveOrganization called.');
    logger.debug('saveOrganization called. Updated Json: ' + updatedJson);
    return new Promise((resolve, reject) => {
      const filterObj = { _id: organizationID};
      Person.findOneAndUpdate(filterObj, updatedJson, async (err, result) => {
        if (err) {
          logger.error('saveOrganization failed : ', err);
          return reject(err);
        }
        logger.debug('saveOrganization done.'+result._id);
        resolve(result._id);
      });
    });
};

  return {
    addOrganization,
    getOrganization,
    getOrganizationByID,
    updateOrganization,
    removeOrganization
  };
};

module.exports = organizationController;