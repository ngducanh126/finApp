const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    body:String,
    img:String,
    comments: [{
        type:Schema.Types.ObjectId,
        ref:'Comment',
    }],
    authorClient:{
        type:Schema.Types.ObjectId,
        ref:'Client',
    },
    authorExpert:{
        type:Schema.Types.ObjectId,
        ref:'Expert',
    }
    
});
console.log('blog model is running')

module.exports = mongoose.model('Blog', BlogSchema);
