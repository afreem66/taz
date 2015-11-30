var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Record = require('../models/recordModel.js');

    var userSchema = new Schema ({
      email: {type: String, required: true},
      passwordDigest: {type: String, required: true},
      name: {type: String, required: true},
      age: {type: Number},
      gender: {type: String},
      doctor: {type: Boolean, required: true},
      specialty: {type: String},
      hospital: {type: String},
      patients: [ {type: Number} ],
      doctors: [ {type: Number} ],
      records: [ { type: Schema.Types.ObjectId, ref: 'Story' } ],
      currentMedications: {type: String},
      familyHistory: {type: String},
      height: {type: String},
      weight: {type: String},
      bloodPressure: {type: String},
      pendingRequests: [ {type: String} ]
    }, {collection: 'user', strict: false});

    var User = mongoose.model('User', userSchema);

    module.exports = User;
