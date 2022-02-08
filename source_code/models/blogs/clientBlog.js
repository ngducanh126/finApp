const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientBlogSchema = new Schema({
    body:String,
    img:String,
    comments: [{
        type:Schema.Types.ObjectId,
        ref:'Client',
    }],
    author:{
        type:Schema.Types.ObjectId,
        ref:'Client'
    }
});


module.exports = mongoose.model('ClientBlog', ClientBlogSchema);
