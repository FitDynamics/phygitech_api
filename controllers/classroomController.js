const logger = require("../commons/logger")('classroomController');
const chalk = require('chalk');

//create, update city
let classroomController = function (Classroom) {

  const addClassroom = async (req, res) => {
    logger.info('addClassroom called.');
    logger.debug('addClassroom called.', req.body.data);
    Classroom.create(req.body.data, function (err, data) {
      if (err || !data) {
        logger.error('addClassroom failed : ', err);
        res.status(500);
        res.send(err);
      }
      else {
        logger.info('addClassroom done.');
        res.status(200);
        res.send("success");
      }
    });
};

const getClassroom = async (req, res) => {
    logger.info('getClassroom called.');
    Classroom.find(function (err, data) {
      if (err || !data) {
        logger.error('getClassroom failed : ', err);
        res.status(500);
        res.send(err);
      }
      else {
        logger.info('getClassroom done.');
        logger.debug('getClassroom done.', data);
        res.status(200);
        res.send(data);
      }
    });
};

const getClassroomByID = async (req, res) => {
    logger.info('getClassroomByID called.');
    logger.debug('getClassroomByID called. Classroom ID: ' + req.params.id );
    try {
        const details = await fetchClassroomDetails(req.params.id);
        logger.info('getClassroomByID done.');
        logger.debug('getClassroomByID done. Classroom Details: ' + JSON.stringify(details, null, 2));
        res.status(200).send({
            status: "success",
            data: details
        })
    }
    catch (err) {
        logger.error('getClassroomByID failed : ', err);
        res.send({
            status: "failed",
            message: err.message
        })
    }
};

const updateClassroom = async (req, res) => {
    logger.info('updateClassroom called.');
    logger.debug('updateClassroom called. Classroom ID: ' + req.params.id );
    try {
        const details = await saveClassroom(req.params.id, req.body.updatedJson);
        logger.info('updateClassroom done.');
        logger.debug('updateClassroom done. Classroom Details: ' + JSON.stringify(details, null, 2));
        res.status(200).send({
            status: "success",
            data: details
        })
    }
    catch (err) {
        logger.error('updateClassroom failed : ', err);
        res.send({
            status: "failed",
            message: err.message
        })
    }
};

const removeClassroom = async (req, res) => {
    logger.info('removeClassroom called.');
    logger.debug('removeClassroom called. Classroom ID:', req.params.id);
    const filterObj = { 
        _id: req.params.id 
    };
    Classroom.deleteOne(filterObj, function (err, data) {
      if (err || !data) {
        logger.error('removeClassroom failed : ', err);
        res.status(500);
        res.send(err);
      }
      else {
        logger.info('removeClassroom done.');
        res.status(200);
        res.send("deleted");
      }
    });
};

const fetchClassroomDetails = (classroomId) => {
    logger.info('fetchClassroomDetails called.');
    logger.debug('fetchClassroomDetails called. Classroom Id: ' + classroomId);
    return new Promise((resolve, reject) => {
        const filterObj = { 
            _id: classroomId 
        };
        Classroom.findOne(filterObj).exec(async (err, res) => {
            if (err) {
                logger.error('fetchClassroomDetails failed : ', err);
                reject(err);
            }
            logger.info('fetchClassroomDetails done.');
            logger.debug('fetchClassroomDetails done. ' + JSON.stringify(res, null, 2));
            resolve(res);
        })
    })
};

const saveClassroom = (classroomID, updatedJson) => {
    logger.info('saveClassroom called.');
    logger.debug('saveClassroom called. Updated Json: ' + updatedJson);
    return new Promise((resolve, reject) => {
      const filterObj = { _id: classroomID};
      Person.findOneAndUpdate(filterObj, updatedJson, async (err, result) => {
        if (err) {
          logger.error('saveClassroom failed : ', err);
          return reject(err);
        }
        logger.debug('saveClassroom done.'+result._id);
        resolve(result._id);
      });
    });
};

  return {
    addClassroom,
    getClassroom,
    getClassroomByID,
    updateClassroom,
    removeClassroom
  };
};

module.exports = classroomController;