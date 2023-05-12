const { model, Schema}  = require('mongoose');
const DesignationSchema = new Schema({


    description: String, 
    designation_name: String, 
    editor: String, 
    level_id: Number,
    date_created:  String,
   date_updated:  String,
    level_obId:  String,
    designation_id: Number,



    accessLevel: {
        type: Schema.Types.ObjectId,
        ref: 'UserLevel'
    }


})

module.exports = model('Designation',DesignationSchema)