const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const ExpertSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age:{
        type:String,
        required:true
    },
    isExpert:{
        type:String,
        default:true
    },
    blogs:[{
        type:Schema.Types.ObjectId,
        ref:'Blog'
    }]
});

ExpertSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Expert', ExpertSchema);
