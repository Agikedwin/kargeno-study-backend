const { model, Schema}  = require('mongoose');

const visitServicesSchema = new Schema({
   
    serviceName: String,
    duration: String,
    description: String,
    visitId:  Schema.ObjectId,
    date_created:  String,
   date_updated:  String,
    status: String,


    visitRef: {
        type: Schema.Types.ObjectId,
        ref: 'Visits'
        },

});

module.exports = model('Services', visitServicesSchema);