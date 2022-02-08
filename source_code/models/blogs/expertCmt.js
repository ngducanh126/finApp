const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpertCmtSchema = new Schema({
    body:String,
    author:{
        type:Schema.Types.ObjectId,
        ref:'Expert'
    }
});


module.exports = mongoose.model('ExpertCmt', ExpertCmtSchema);
