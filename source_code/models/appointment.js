const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    client:{
        type:Schema.Types.ObjectId,
        ref:'Client'
    },
    expert:{
        type:Schema.Types.ObjectId,
        ref:'Expert'
    },
    state:{
        type: String,
        enum : ['pending','confirmed'],
        default:'pending'
    },
    time:{
        type:String,
        required:true,
    },
    message:{
        type:String,
    }
});


module.exports = mongoose.model('Appointment', AppointmentSchema);
