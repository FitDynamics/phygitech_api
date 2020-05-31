const logger = require("../commons/logger")('parentController');
const chalk = require('chalk');

//create, update city
let parentController = function (Parent) {

    const addParent = async (req, res) => {
        logger.info('addParent called.');
        logger.debug('addParent called.', req.body.data);
        Parent.create(req.body.data, function (err, data) {
          if (err || !data) {
            logger.error('addParent failed : ', err);
            res.status(500);
            res.send(err);
          }
          else {
            logger.info('addParent done.');
            res.status(200);
            res.send("success");
          }
        });
    };

    const getParent = async (req, res) => {
        logger.info('getParent called.');
        Parent.find(function (err, data) {
          if (err || !data) {
            logger.error('getParent failed : ', err);
            res.status(500);
            res.send(err);
          }
          else {
            logger.info('getParent done.');
            logger.debug('getParent done.', data);
            res.status(200);
            res.send(data);
          }
        });
    };

    const getParentByID = async (req, res) => {
        logger.info('getParentByID called.');
        logger.debug('getParentByID called. Parent ID: ' + req.params.id );
        try {
            const details = await fetchParentDetails(req.params.id);
            logger.info('getParentByID done.');
            logger.debug('getParentByID done. Parent Details: ' + JSON.stringify(details, null, 2));
            res.status(200).send({
                status: "success",
                data: details
            })
        }
        catch (err) {
            logger.error('getParentByID failed : ', err);
            res.send({
                status: "failed",
                message: err.message
            })
        }
    };

    const updateParent = async (req, res) => {
        logger.info('updateParent called.');
        logger.debug('updateParent called. Parent ID: ' + req.params.id );
        try {
            const details = await saveParent(req.params.id, req.body.updatedJson);
            logger.info('updateParent done.');
            logger.debug('updateParent done. Parent Details: ' + JSON.stringify(details, null, 2));
            res.status(200).send({
                status: "success",
                data: details
            })
        }
        catch (err) {
            logger.error('updateParent failed : ', err);
            res.send({
                status: "failed",
                message: err.message
            })
        }
    };

    const removeParent = async (req, res) => {
        logger.info('removeParent called.');
        logger.debug('removeParent called. Parent ID:', req.params.id);
        const filterObj = { 
            _id: req.params.id 
        };
        Parent.deleteOne(filterObj, function (err, data) {
          if (err || !data) {
            logger.error('removeParent failed : ', err);
            res.status(500);
            res.send(err);
          }
          else {
            logger.info('removeParent done.');
            res.status(200);
            res.send("deleted");
          }
        });
    };

    const fetchParentDetails = (parentId) => {
        logger.info('fetchParentDetails called.');
        logger.debug('fetchParentDetails called. Parent Id: ' + parentId);
        return new Promise((resolve, reject) => {
            const filterObj = { 
                _id: parentId 
            };
            Parent.findOne(filterObj).exec(async (err, res) => {
                if (err) {
                    logger.error('fetchParentDetails failed : ', err);
                    reject(err);
                }
                logger.info('fetchParentDetails done.');
                logger.debug('fetchParentDetails done. ' + JSON.stringify(res, null, 2));
                resolve(res);
            })
        })
    };

    const saveParent = (parentID, updatedJson) => {
        logger.info('saveParent called.');
        logger.debug('saveParent called. Updated Json: ' + updatedJson);
        return new Promise((resolve, reject) => {
          const filterObj = { _id: parentID};
          Person.findOneAndUpdate(filterObj, updatedJson, async (err, result) => {
            if (err) {
              logger.error('saveParent failed : ', err);
              return reject(err);
            }
            logger.debug('saveParent done.'+result._id);
            resolve(result._id);
          });
        });
    };

  return {
    addParent,
    getParent,
    getParentByID,
    updateParent,
    removeParent
  };
};

module.exports = parentController;