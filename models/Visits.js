const { model, Schema}  = require('mongoose');


const visitsSchema = new Schema({

    visitName: String,
    visitNumber: Number,
    windowPeriod: String,
    description: String,
    program_id:  Schema.ObjectId,
    dayFromBaseDate: Number,
    date_created:  String,
    date_updated:  String,
    status: String

});

module.exports = model('Visits', visitsSchema);