const logger = require("../commons/logger")('branchController');
const chalk = require('chalk');

//create, update city
let branchController = function (Branch) {

    const addBranch = async (req, res) => {
        logger.info('addBranch called.');
        logger.debug('addBranch called.', req.body.data);
        Branch.create(req.body.data, function (err, data) {
          if (err || !data) {
            logger.error('addBranch failed : ', err);
            res.status(500);
            res.send(err);
          }
          else {
            logger.info('addBranch done.');
            res.status(200);
            res.send("success");
          }
        });
    };

    const getBranch = async (req, res) => {
        logger.info('getBranch called.');
        Branch.find(function (err, data) {
          if (err || !data) {
            logger.error('getBranch failed : ', err);
            res.status(500);
            res.send(err);
          }
          else {
            logger.info('getBranch done.');
            logger.debug('getBranch done.', data);
            res.status(200);
            res.send(data);
          }
        });
    };

    const getBranchByID = async (req, res) => {
        logger.info('getBranchByID called.');
        logger.debug('getBranchByID called. Branch ID: ' + req.params.id );
        try {
            const details = await fetchBranchDetails(req.params.id);
            logger.info('getBranchByID done.');
            logger.debug('getBranchByID done. Branch Details: ' + JSON.stringify(details, null, 2));
            res.status(200).send({
                status: "success",
                data: details
            })
        }
        catch (err) {
            logger.error('getBranchByID failed : ', err);
            res.status(500).send({
                status: "failed",
                message: err.message
            })
        }
    };

    const updateBranch = async (req, res) => {
        logger.info('updateBranch called.');
        logger.debug('updateBranch called. Branch ID: ' + req.params.id );
        try {
            const details = await saveBranch(req.params.id, req.body.updatedJson);
            logger.info('updateBranch done.');
            logger.debug('updateBranch done. Branch Details: ' + JSON.stringify(details, null, 2));
            res.status(200).send({
                status: "success",
                data: details
            })
        }
        catch (err) {
            logger.error('updateBranch failed : ', err);
            res.status(500).send({
                status: "failed",
                message: err.message
            })
        }
    };

    const removeBranch = async (req, res) => {
        logger.info('removeBranch called.');
        logger.debug('removeBranch called. Branch ID:', req.params.id);
        const filterObj = { 
            _id: req.params.id 
        };
        Branch.deleteOne(filterObj, function (err, data) {
          if (err || !data) {
            logger.error('removeBranch failed : ', err);
            res.status(500);
            res.send(err);
          }
          else {
            logger.info('removeBranch done.');
            res.status(200);
            res.send("deleted");
          }
        });
    };

    const fetchBranchDetails = (branchId) => {
        logger.info('fetchBranchDetails called.');
        logger.debug('fetchBranchDetails called. Branch Id: ' + branchId);
        return new Promise((resolve, reject) => {
            const filterObj = { 
                _id: branchId 
            };
            Branch.findOne(filterObj).exec(async (err, res) => {
                if (err) {
                    logger.error('fetchBranchDetails failed : ', err);
                    reject(err);
                }
                logger.info('fetchBranchDetails done.');
                logger.debug('fetchBranchDetails done. ' + JSON.stringify(res, null, 2));
                resolve(res);
            })
        })
    };

    const saveBranch = (branchID, updatedJson) => {
        logger.info('saveBranch called.');
        logger.debug('saveBranch called. Updated Json: ' + updatedJson);
        return new Promise((resolve, reject) => {
          const filterObj = { _id: branchID};
          Person.findOneAndUpdate(filterObj, updatedJson, async (err, result) => {
            if (err) {
              logger.error('saveBranch failed : ', err);
              return reject(err);
            }
            logger.debug('saveBranch done.'+result._id);
            resolve(result._id);
          });
        });
    };

  return {
    addBranch,
    getBranch,
    getBranchByID,
    updateBranch,
    removeBranch
  };
};

module.exports = branchController;