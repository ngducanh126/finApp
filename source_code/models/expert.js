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
    experience:{
        type:String,
        required:true,
    },
    freetime:{
        type:String,
        
    },
    isExpert:{
        type:String,
        default:true
    },
    blogs:[{
        type:Schema.Types.ObjectId,
        ref:'Blog'
    }],
    pendingAppointments:[{
        type:String
    }]
});

ExpertSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Expert', ExpertSchema);
