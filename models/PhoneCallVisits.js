const { model, Schema}  = require('mongoose');

const phoneCallVisits = new Schema({
    userId: Schema.ObjectId,
    visitId: Schema.ObjectId,
    physicalVisitId: Schema.ObjectId,
    date_created:  Date,
    date_updated:  Date,
    visitStatus: Boolean,
    visit_date: Date,
    status: Number,


    userRef: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },

    visitsRef: {
    type: Schema.Types.ObjectId,
    ref: 'visits'
    },

});

module.exports = model('phoneCallVisits', phoneCallVisits);