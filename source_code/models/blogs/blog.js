const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    body:String,
    image:{
        url:String,
        filename:String
    },
    title:String,
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
    },
    category:{
        type:String,
        enum:[ "loan","banking", "saving", "budget planning", "fintech"],
        default:"saving"
    },
    views:{
        type:Number,
        
    }
    
});
console.log('blog model is running')

module.exports = mongoose.model('Blog', BlogSchema);
