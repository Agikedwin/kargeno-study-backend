const { model, Schema}  = require('mongoose');

const programsSchema = new Schema({
    programName: String,
    owner: String,
    description: String,
    date_created:  String,
    date_updated:  String,
    status: Number,

});

module.exports = model('program', programsSchema);