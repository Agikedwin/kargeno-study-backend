const { model, Schema}  = require('mongoose');
const userSchema = new Schema({


    surname: String,
    other_names: String,
    phone_number: String,
    designation_id: Number,
    level_id: Number,
    dob: Date,
    email: String,
    gender: String,
    patient_identifier: String,
    username: String,
    password:  String,
    editor: String,
    status: Number,
    date_created:  String,
   date_updated:  String,


  designation_ref: {
    type: Schema.Types.ObjectId,
    ref: 'Designation'
  },

  accessLevel: {
    type: Schema.Types.ObjectId,
    ref: 'UserLevel'
}
  
  

})

module.exports = model('User', userSchema)