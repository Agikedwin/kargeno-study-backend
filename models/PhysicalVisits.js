const { model, Schema}  = require('mongoose');

const physicalVisits = new Schema({
    userId: Schema.ObjectId,
    visitId: Schema.ObjectId,
    date_created:  Date,
    date_updated:  Date,
    visitStatus: Boolean,
    visit_date: Date,
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