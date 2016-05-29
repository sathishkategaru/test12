var mongoose = require("mongoose");
var mongoUrl = 'mongodb://localhost:27017/schooladmintest';

mongoose.connect(mongoUrl, { server: { poolSize: 1 } }, function(err, res) {
    if (err) {
        console.log("Mongoose: [ERROR] " + err)
    } else {
        console.log("Mongoose[INFO]: Connection to mongodb established");
    }
});


var examSchema = mongoose.Schema({
    id: String,
    name: String,
    startDate: Date,
    subjects: [{ id: Number, name: String, maxMarks: Number }]
});

var Exam = mongoose.model("exams", examSchema);

exports.createRecords = function(examRecords, successCallback, failureCallback) {
    var exams = [],
        exam;

    examRecords.forEach(function(exam) {
        exams.push(new Exam({
            id: exam.id,
            name: exam.name,
            startDate: exam.startDate,
            subjects: exam.subjects
        }))
    })
    console.log("in db insert", exams)
    if (exams.length) {
        Exam.insertMany(exams, function(err, data) {
            if (err) {
                console.log(err);
                failureCallback(err);
            } else {
                console.log("Record saved successfully");
                successCallback(data);
            }
        });
    } else {
        successCallback(exams)
    }

}

exports.getRecords = function(successCallback, failureCallback) {
    Exam.find({}, function(err, data) {
        if (err) {
            console.log(err);
            failureCallback(err);
        } else {
            successCallback(data);
        }
    });
}

exports.updateRecords = function(examRecords, successCallback, failureCallback) {
    var exams = [],
        exam, ids = [];

    examRecords.forEach(function(exam) {
        ids.push(exam.id);
        exams.push(new Exam({
            id: exam.id,
            name: exam.name,
            startDate: exam.startDate,
            subjects: exam.subjects
        }))
    })
    console.log('in db update', exams)
    if (exams.length) {
        Exam.remove({ id: { $in: ids } }, function(err) {
            if (err) {
                console.log("Exams deletion failed")
            } else {
                console.log("updating", exams)
                Exam.insertMany(exams, function(err, data) {
                    if (err) {
                        console.log(err);
                        failureCallback(err);
                    } else {
                        console.log("Record saved successfully");
                        successCallback(data);
                    }
                });
            }
        })
    } else {
        successCallback();
    }
}

exports.deleteRecords = function(ids, successCallback) {
    console.log("in db deletion")
    if (ids.length) {
        Exam.remove({ id: { $in: ids } }, function(err) {
            if (err) {
                console.log("Exams deletion failed")
            } else if (successCallback) {
                successCallback();
            }
        })
    } else {
        successCallback();
    }
}
