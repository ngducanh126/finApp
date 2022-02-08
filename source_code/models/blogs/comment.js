const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    body:String,
    authorClient:{
        type:Schema.Types.ObjectId,
        ref:'Client',
    },
    authorExpert:{
        type:Schema.Types.ObjectId,
        ref:'Expert',
    }
    
});

console.log('cmt route is running')
module.exports = mongoose.model('Comment', CommentSchema);
