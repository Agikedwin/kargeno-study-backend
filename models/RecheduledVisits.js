const { model, Schema}  = require('mongoose');

const recheduledVisitsSChema = new Schema({
    physicalVisitId: Schema.ObjectId,
    userId: Schema.ObjectId,
    visitId: Schema.ObjectId,
    rescheduled_date: String,
    visit_date: String,
    date_created:  String,
    date_updated:  String,
    status: Number,


    userRef: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },

    visitsRef: {
    type: Schema.Types.ObjectId,
    ref: 'visits'
    },

});

module.exports = model('recheduledVisits', recheduledVisitsSChema);