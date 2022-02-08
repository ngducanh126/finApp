const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpertBlogSchema = new Schema({
    body:String,
    img:String,
    comments: [{
        type:Schema.Types.ObjectId,
        ref:'Expert',
    }],
    author:{
        type:Schema.Types.ObjectId,
        ref:'Expert'
    }
});


module.exports = mongoose.model('ExpertBlog', ExpertBlogSchema);
