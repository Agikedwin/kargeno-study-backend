const { model, Schema}  = require('mongoose');

const checkInUserSchema = new Schema({
    userId: String,
    programId: String,
    visitId: String,
    createdAt: Date,
    updatedAt: Date,
    status: String,


    visitRef: {
        type: Schema.Types.ObjectId,
        ref: 'Visits'
        },

    userRef: {
        type: Schema.Types.ObjectId,
        ref: 'User'
        },
    


});

module.exports = model('CheckInUser', checkInUserSchema);