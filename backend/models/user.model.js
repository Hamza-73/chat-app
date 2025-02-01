const mongoose = require('mongoose');

const userScehma = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
});


const User = mongoose.model('User', userScehma);

module.exports = User;