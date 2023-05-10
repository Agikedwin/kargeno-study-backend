const { model, Schema}  = require('mongoose');

const serviceProvidedSchema = new Schema({
    
    userId: Schema.ObjectId,
    visitId: Schema.ObjectId,
    visitType: Number,
    serviceOfferedId: Schema.ObjectId,
    date_created: Date,
    date_updated: Date,
    status: Number,

    serviceRef: {
        type: Schema.Types.ObjectId,
        ref: 'services'
        },

        userRef: {
            type: Schema.Types.ObjectId,
            ref: 'user'
          },


});

module.exports = model('physicalservicesprovided', serviceProvidedSchema);