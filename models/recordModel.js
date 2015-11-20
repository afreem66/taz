var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var recordSchema = new Schema ({
      date: {type: Date, default: Date.now},
      bodySystem: {type: String, required: true},
      description: {type: String, required: true},
      treatment: {type: String, required: true}
      // author: {type: String, required: true},
      // patient: {type: String, required: true}
    }, {collection: 'record', strict: false});

    var Record = mongoose.model('Record', recordSchema);

    module.exports = Record;
