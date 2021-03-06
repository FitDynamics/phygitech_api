const logger = require("../commons/logger")('studentController');
const chalk = require('chalk');

//create, update Student
let studentController = function (Student, Classroom) {

    const addStudent = async (req, res) => {
        logger.info('addStudent called.');
        logger.debug('addStudent called.', req.body);
        Student.create(req.body, function (err, data) {
          if (err || !data) {
            logger.error('addStudent failed : ', err);
            res.status(500);
            res.send(err);
          }
          else {
            logger.info('addStudent done.');
            res.status(200);
            res.send("success");
          }
        });
    };
    
    const getStudent = async (req, res) => {
        logger.info('getStudent called.');
        Student.find()
        .populate({path : 'class', select: "_id name category"})
        .lean()
        .exec( function (err, data) {
          if (err || !data) {
            logger.error('getStudent failed : ', err);
            res.status(500);
            res.send(err);
          }
          else {
            logger.info('getStudent done.');
            logger.debug('getStudent done.', data);
            var completedata = []
            for (key in data) {
              let item = data[key]
            
              let innerObj = {
                name: item.name,
                mobileNo: item.mobileNo,
                address: item.address.city,
                class: item.class.name,
                category: item.class.category
              }

              completedata.push(innerObj)
            }
            res.send(completedata);
          }
        });
    };

    const getStudentByID = async (req, res) => {
        logger.info('getStudentByID called.');
        logger.debug('getStudentByID called. Student ID: ' + req.params.id );
        try {
            const details = await fetchStudentDetails(req.params.id);
            logger.info('getStudentByID done.');
            logger.debug('getStudentByID done. Student Details: ' + JSON.stringify(details, null, 2));
            res.status(200).send({
                status: "success",
                data: details
            })
        }
        catch (err) {
            logger.error('getStudentByID failed : ', err);
            res.send({
                status: "failed",
                message: err.message
            })
        }
    };

    const updateStudent = async (req, res) => {
        logger.info('updateStudent called.');
        logger.debug('updateStudent called. Student ID: ' + req.params.id );
        try {
            const details = await saveStudent(req.params.id, req.body.updatedJson);
            logger.info('updateStudent done.');
            logger.debug('updateStudent done. Student Details: ' + JSON.stringify(details, null, 2));
            res.status(200).send({
                status: "success",
                data: details
            })
        }
        catch (err) {
            logger.error('updateStudent failed : ', err);
            res.send({
                status: "failed",
                message: err.message
            })
        }
    };

    const removeStudent = async (req, res) => {
        logger.info('removeStudent called.');
        logger.debug('removeStudent called. Student ID:', req.params.id);
        const filterObj = { 
            _id: req.params.id 
        };
        Student.deleteOne(filterObj, function (err, data) {
          if (err || !data) {
            logger.error('removeStudent failed : ', err);
            res.status(500);
            res.send(err);
          }
          else {
            logger.info('removeStudent done.');
            res.status(200);
            res.send("deleted");
          }
        });
    };

    const fetchStudentDetails = async function (filterObj) {
        logger.info('fetchStudentDetails called.');
        logger.debug('fetchStudentDetails called. Filter Obj: ' + filterObj);
        return new Promise((resolve, reject) => {
            // const filterObj = { 
            //     _id: studentId 
            // };
            Student.find(filterObj)
            .populate({path : 'class', select: "_id name category"})
            .lean()
            .exec( function (err, res) {
                if (err) {
                    logger.error('fetchStudentDetails failed : ', err);
                    reject(err);
                }
                logger.info('fetchStudentDetails done.');
                logger.debug('fetchStudentDetails done. ' + JSON.stringify(res, null, 2));
                resolve(res);
            })
        })
    };

    const saveStudent = (studentID, updatedJson) => {
        logger.info('saveStudent called.');
        logger.debug('saveStudent called. Updated Json: ' + updatedJson);
        return new Promise((resolve, reject) => {
          const filterObj = { _id: studentID};
          Person.findOneAndUpdate(filterObj, updatedJson, async (err, result) => {
            if (err) {
              logger.error('saveStudent failed : ', err);
              return reject(err);
            }
            logger.debug('saveStudent done.'+result._id);
            resolve(result._id);
          });
        });
    };

  return {
    addStudent,
    getStudent,
    getStudentByID,
    updateStudent,
    removeStudent,
    fetchStudentDetails
  };
};

module.exports = studentController;