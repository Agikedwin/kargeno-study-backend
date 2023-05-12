const { model, Schema}  = require('mongoose');

const userProgramsSchema = new Schema({
    userId: Schema.ObjectId,
    programId: Schema.ObjectId,
    date_created:  String,
   date_updated:  String,
    enrollStatus: Boolean,
    enrollment_date: Date,
    status: Number,


    userRef: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },

    programRef: {
    type: Schema.Types.ObjectId,
    ref: 'ProgramEnrollments'
    },

});

module.exports = model('UserProgram', userProgramsSchema);