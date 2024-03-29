const { model, Schema}  = require('mongoose');

const phoneCallVisits = new Schema({
    userId: Schema.ObjectId,
    visitId: Schema.ObjectId,
    physicalVisitId: Schema.ObjectId,
    date_created:  String,
   date_updated:  String,
    visitStatus: Boolean,
    visit_date: String,
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