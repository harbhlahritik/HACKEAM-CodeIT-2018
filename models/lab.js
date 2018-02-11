var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var LabSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    license: {
        type: String,
        unique: true,
        required: true,
    },
    mobile: {
      type: String,
      unique: true,
      required: true,
    }
});

//authenticate input against database
LabSchema.statics.authenticate = function (license, password, callback) {
    Lab.findOne({ license: license })
        .exec(function (err, Lab) {
            if (err) {
                return callback(err)
            } else if (!Lab) {
                var err = new Error('Lab not existing.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, Lab.password, function (err, result) {
                if (result === true) {
                    return callback(null, Lab);
                } else {
                    return callback();
                }
            })
        });
}

//hashing a password before saving it to the database
LabSchema.pre('save', function (next) {
    var Lab = this;
    bcrypt.hash(Lab.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        Lab.password = hash;
        next();
    })
});


var Lab = mongoose.model('Lab', LabSchema);
module.exports = Lab;
