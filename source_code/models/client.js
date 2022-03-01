const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const ClientSchema = new Schema({
    fullname:{
        type: String,
        required:true
    },
    img:{
        url:String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age:{
        type: String,
        required:true
    },
    isClient:{
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

ClientSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Client', ClientSchema);
