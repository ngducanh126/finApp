const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientCmtSchema = new Schema({
    body:String,
    author:{
        type:Schema.Types.ObjectId,
        ref:'Client'
    }
});


module.exports = mongoose.model('ClientCmt', ClientCmtSchema);
