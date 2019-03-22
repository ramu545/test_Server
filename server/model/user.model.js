const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    uname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        'default':'user'
    }
});

mongoose.model('User', UserSchema, 'users');