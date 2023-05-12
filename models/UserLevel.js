const { model, Schema}  = require('mongoose');
const userLevelSchema = new Schema({

    level_name: String,
    description: String,
    date_created:  String,
   date_updated:  String,
    level_id: Number,
    

})

module.exports = model('UserLevel',userLevelSchema)