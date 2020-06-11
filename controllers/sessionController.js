const logger = require("../commons/logger")('sessionController');
const chalk = require('chalk');

//create, read, update, delete session
let sessionController = function (Session) {

    const createSession = async (req, res) => {
        logger.info('addSession called.');
        logger.debug('addSession called.' + JSON.stringify(req.body));
        Session.create(req.body, function (err, data) {
          if (err || !data) {
            logger.error('addSession failed : ', err);
            res.status(500);
            res.send(err);
          }
          else {
            logger.info('addSession done.');
            logger.debug('addSession done.' + JSON.stringify(data));
            res.status(200);
            res.send("success");
          }
        });
    };

    const getSession = async (req, res) => {
        logger.info('getSession called.');
        Session.find(function (err, data) {
          if (err || !data) {
            logger.error('getSession failed : ', err);
            res.status(500);
            res.send(err);
          }
          else {
            logger.info('getSession done.');
            logger.debug('getSession done.', data);
            res.status(200);
            res.send(data);
          }
        });
    };

    const getSessionByID = async (req, res) => {
        logger.info('getSessionByID called.');
        try {
          const user = res.locals.loggedInUser;
          logger.debug('getSessionByID called. Email ID: ' + user.email );
          const details = await fetchSessionDetails(user.email);
          logger.info('getSessionByID done.');
          logger.debug('getSessionByID done. Session Details: ' + JSON.stringify(details, null, 2));
          res.status(200).send({
              status: "success",
              data: details
          })
        }
        catch (err) {
            logger.error('getSessionByID failed : ', err);
            res.send({
                status: "failed",
                message: err.message
            })
        }
    };

    const updateSession = async (req, res) => {
        logger.info('updateSession called.');
        logger.debug('updateSession called. Session ID: ' + req.params.id );
        try {
            const details = await saveSession(req.params.id, req.body.updatedJson);
            logger.info('updateSession done.');
            logger.debug('updateSession done. Session Details: ' + JSON.stringify(details, null, 2));
            res.status(200).send({
                status: "success",
                data: details
            })
        }
        catch (err) {
            logger.error('updateSession failed : ', err);
            res.send({
                status: "failed",
                message: err.message
            })
        }
    };

    const removeSession = async (req, res) => {
        logger.info('removeSession called.');
        logger.debug('removeSession called. Session ID:', req.params.id);
        const filterObj = { 
            _id: req.params.id 
        };
        Session.deleteOne(filterObj, function (err, data) {
          if (err || !data) {
            logger.error('removeSession failed : ', err);
            res.status(500);
            res.send(err);
          }
          else {
            logger.info('removeSession done.');
            res.status(200);
            res.send("deleted");
          }
        });
    };

    const fetchSessionDetails = (emailId) => {
        logger.info('fetchSessionDetails called.');
        logger.debug('fetchSessionDetails called. Session Id: ' + emailId);
        return new Promise((resolve, reject) => {
            const filterObj = { 
                email: emailId 
            };
            Session.findOne(filterObj).exec(async (err, res) => {
                if (err) {
                    logger.error('fetchSessionDetails failed : ', err);
                    reject(err);
                }
                logger.info('fetchSessionDetails done.');
                logger.debug('fetchSessionDetails done. ' + JSON.stringify(res, null, 2));
                resolve(res);
            })
        })
    };

    const saveSession = (sessionID, updatedJson) => {
        logger.info('saveSession called.');
        logger.debug('saveSession called. Updated Json: ' + updatedJson);
        return new Promise((resolve, reject) => {
          const filterObj = { _id: sessionID};
          Person.findOneAndUpdate(filterObj, updatedJson, async (err, result) => {
            if (err) {
              logger.error('saveSession failed : ', err);
              return reject(err);
            }
            logger.debug('saveSession done.'+result._id);
            resolve(result._id);
          });
        });
    };

    return {
        createSession,
        getSession,
        getSessionByID,
        updateSession,
        removeSession
    };
};

module.exports = sessionController;