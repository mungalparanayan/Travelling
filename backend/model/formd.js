const mongoose = require('mongoose');
const { Schema } = mongoose;

const FormSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : false
    }, 
    age : {
        type : Number,
        required : true
    },
    phoneno : {
        type : String,
        required : true,
    },
    date : {
        type : Date,
        default : Date.now
    },
    dep_country : {
        type : String,
        required : true
    },
    des_country : {
        type : String,
        required : true
    },
    dep_date : {
        type : Date,
        required : true
    }, 
    des_date : {
        type : Date,
        required : true
    },
    service_class : {
        type : String,
        required : true
    }
})

const formd = mongoose.model('formdata', FormSchema); 

module.exports = formd;