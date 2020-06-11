const logger = require("../commons/logger")('contentController');
const chalk = require('chalk');

//create, read, update, delete content
let contentController = function (Content) {

    const createContent = async (req, res) => {
        logger.info('addContent called.');
        logger.debug('addContent called.' + JSON.stringify(req.body));
        Content.create(req.body, function (err, data) {
          if (err || !data) {
            logger.error('addContent failed : ', err);
            res.status(500);
            res.send(err);
          }
          else {
            logger.info('addContent done.');
            logger.debug('addContent done.' + JSON.stringify(data));
            res.status(200);
            res.send("success");
          }
        });
    };

    const getContent = async (req, res) => {
        logger.info('getContent called.');
        Content.find(function (err, data) {
          if (err || !data) {
            logger.error('getContent failed : ', err);
            res.status(500);
            res.send(err);
          }
          else {
            logger.info('getContent done.');
            logger.debug('getContent done.', data);
            res.status(200);
            res.send(data);
          }
        });
    };

    const getContentByID = async (req, res) => {
        logger.info('getContentByID called.');
        try {
          const user = res.locals.loggedInUser;
          logger.debug('getContentByID called. Email ID: ' + user.email );
          const details = await fetchContentDetails(user.email);
          logger.info('getContentByID done.');
          logger.debug('getContentByID done. Content Details: ' + JSON.stringify(details, null, 2));
          res.status(200).send({
              status: "success",
              data: details
          })
        }
        catch (err) {
            logger.error('getContentByID failed : ', err);
            res.send({
                status: "failed",
                message: err.message
            })
        }
    };

    const updateContent = async (req, res) => {
        logger.info('updateContent called.');
        logger.debug('updateContent called. Content ID: ' + req.params.id );
        try {
            const details = await saveContent(req.params.id, req.body.updatedJson);
            logger.info('updateContent done.');
            logger.debug('updateContent done. Content Details: ' + JSON.stringify(details, null, 2));
            res.status(200).send({
                status: "success",
                data: details
            })
        }
        catch (err) {
            logger.error('updateContent failed : ', err);
            res.send({
                status: "failed",
                message: err.message
            })
        }
    };

    const removeContent = async (req, res) => {
        logger.info('removeContent called.');
        logger.debug('removeContent called. Content ID:', req.params.id);
        const filterObj = { 
            _id: req.params.id 
        };
        Content.deleteOne(filterObj, function (err, data) {
          if (err || !data) {
            logger.error('removeContent failed : ', err);
            res.status(500);
            res.send(err);
          }
          else {
            logger.info('removeContent done.');
            res.status(200);
            res.send("deleted");
          }
        });
    };

    const fetchContentDetails = (emailId) => {
        logger.info('fetchContentDetails called.');
        logger.debug('fetchContentDetails called. Content Id: ' + emailId);
        return new Promise((resolve, reject) => {
            const filterObj = { 
                email: emailId 
            };
            Content.findOne(filterObj).exec(async (err, res) => {
                if (err) {
                    logger.error('fetchContentDetails failed : ', err);
                    reject(err);
                }
                logger.info('fetchContentDetails done.');
                logger.debug('fetchContentDetails done. ' + JSON.stringify(res, null, 2));
                resolve(res);
            })
        })
    };

    const saveContent = (contentID, updatedJson) => {
        logger.info('saveContent called.');
        logger.debug('saveContent called. Updated Json: ' + updatedJson);
        return new Promise((resolve, reject) => {
          const filterObj = { _id: contentID};
          Person.findOneAndUpdate(filterObj, updatedJson, async (err, result) => {
            if (err) {
              logger.error('saveContent failed : ', err);
              return reject(err);
            }
            logger.debug('saveContent done.'+result._id);
            resolve(result._id);
          });
        });
    };

    return {
        createContent,
        getContent,
        getContentByID,
        updateContent,
        removeContent
    };
};

module.exports = contentController;