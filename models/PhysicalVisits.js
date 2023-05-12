const { model, Schema}  = require('mongoose');

const physicalVisits = new Schema({
    userId: Schema.ObjectId,
    visitId: Schema.ObjectId,
    date_created:  String,
   date_updated:  String,
    visitStatus: Boolean,
    visit_date: String,
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

module.exports = model('physicalVisits', physicalVisits);