var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('../models/userModel.js');;

    var recordSchema = new Schema ({
      author: {type: String},
      _author: { type: String, ref: 'User' },
      date: {type: String, required: true},
      complaint: {type: String, required: true},
      bodySystem: {type: String, required: true},
      description: {type: String, required: true},
      treatment: {type: String, required: true},
      patient: {type: String}
    }, {collection: 'record', strict: false});

    var Record = mongoose.model('Record', recordSchema);

    module.exports = Record;
