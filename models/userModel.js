var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var userSchema = new Schema ({
      username: {type: String, required: true},
      passwordDigest: {type: String, required: true},
      name: {type: String, required: true},
      age: {type: Number},
      doctor: {type: Boolean, required: true},
      specialty: {type: String},
      hospital: {type: String},
      patients: [ {type: Number} ],
      doctors: [ {type: Number} ],
      records: [ {type: Number} ],
      medications: [ {type: String} ],
      familyHistory: {type: String, required: true},
      height: {type: String, required: true},
      weight: {type: String, required: true},
      pendingRequests: [ {type: Number} ]
    }, {collection: 'user', strict: false});

    var User = mongoose.model('User', userSchema);

    module.exports = User;
