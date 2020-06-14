const logger = require("../commons/logger")('teacherController');
const chalk = require('chalk');
var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

//create, update city
let teacherController = function (Teacher, Classroom) {

    const addTeacher = async (req, res) => {
        logger.info('addTeacher called.');
        logger.debug('addTeacher called.', req.body);
        Teacher.create(req.body, function (err, data) {
          if (err || !data) {
            logger.error('addTeacher failed : ', err);
            res.status(500);
            res.send(err);
          }
          else {
            logger.info('addTeacher done.');
            res.status(200);
            res.send("success");
          }
        });
    };

    const getClassName = (classId) => {
        return new Promise((resolve, reject) => {
          const filterObj = { 
              _id: classId
          };
          Classroom.find(filterObj).exec(async (err, res) => {
              if (err) {
                  logger.error('classname failed : ', err);
                  reject(err);
              }
              logger.info('classname done.');
              logger.debug('classname done. ' + JSON.stringify(res, null, 2));
              resolve(res.name);
          })
      })
    }

    const getTeacher = async (req, res) => {
        logger.info('getTeacher called.');
        Teacher.find( async function (err, data) {
          if (err || !data) {
            logger.error('getTeacher failed : ', err);
            res.status(500);
            res.send(err);
          }
          else {
            logger.info('getTeacher done.');
            logger.debug('getTeacher done.', data);
            var completedata = []
              for (key in data) {
                let item = data[key]

                const classname = await getClassName(item.class)
                // console.log(classname)
              
                let innerObj = {
                  value: item._id,
                  label: item.name,
                  name: item.name,
                  mobileNo: item.mobileNo,
                  address: item.address.city,
                  // class: classname[0].name
                }
                await completedata.push(innerObj)
              }
              res.send(completedata);
            }
        });
    };

    const getTeacherByID = async (req, res) => {
        logger.info('getTeacherByID called.');
        logger.debug('getTeacherByID called. Teacher ID: ' + req.params.id );
        try {
            const details = await fetchTeacherDetails(req.params.id);
            logger.info('getTeacherByID done.');
            logger.debug('getTeacherByID done. Teacher Details: ' + JSON.stringify(details, null, 2));
            res.status(200).send({
                status: "success",
                data: details
            })
        }
        catch (err) {
            logger.error('getTeacherByID failed : ', err);
            res.send({
                status: "failed",
                message: err.message
            })
        }
    };

    const updateTeacher = async (req, res) => {
        logger.info('updateTeacher called.');
        logger.debug('updateTeacher called. Teacher ID: ' + req.params.id );
        try {
            const details = await saveTeacher(req.params.id, req.body.updatedJson);
            logger.info('updateTeacher done.');
            logger.debug('updateTeacher done. Teacher Details: ' + JSON.stringify(details, null, 2));
            res.status(200).send({
                status: "success",
                data: details
            })
        }
        catch (err) {
            logger.error('updateTeacher failed : ', err);
            res.send({
                status: "failed",
                message: err.message
            })
        }
    };

    const removeTeacher = async (req, res) => {
        logger.info('removeTeacher called.');
        logger.debug('removeTeacher called. Teacher ID:', req.params.id);
        const filterObj = { 
            _id: req.params.id 
        };
        Teacher.deleteOne(filterObj, function (err, data) {
          if (err || !data) {
            logger.error('removeTeacher failed : ', err);
            res.status(500);
            res.send(err);
          }
          else {
            logger.info('removeTeacher done.');
            res.status(200);
            res.send("deleted");
          }
        });
    };

    const fetchTeacherDetails = (teacherId) => {
        logger.info('fetchTeacherDetails called.');
        logger.debug('fetchTeacherDetails called. Teacher Id: ' + teacherId);
        return new Promise((resolve, reject) => {
            const filterObj = { 
                _id: teacherId 
            };
            Teacher.findOne(filterObj).exec(async (err, res) => {
                if (err) {
                    logger.error('fetchTeacherDetails failed : ', err);
                    reject(err);
                }
                logger.info('fetchTeacherDetails done.');
                logger.debug('fetchTeacherDetails done. ' + JSON.stringify(res, null, 2));
                resolve(res);
            })
        })
    };

    const saveTeacher = (teacherID, updatedJson) => {
        logger.info('saveTeacher called.');
        logger.debug('saveTeacher called. Updated Json: ' + updatedJson);
        return new Promise((resolve, reject) => {
          const filterObj = { _id: teacherID};
          Person.findOneAndUpdate(filterObj, updatedJson, async (err, result) => {
            if (err) {
              logger.error('saveTeacher failed : ', err);
              return reject(err);
            }
            logger.debug('saveTeacher done.'+result._id);
            resolve(result._id);
          });
        });
    };

  return {
    addTeacher,
    getTeacher,
    getTeacherByID,
    updateTeacher,
    removeTeacher
  };
};

module.exports = teacherController;