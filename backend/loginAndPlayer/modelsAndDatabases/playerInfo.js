const mongoose = require('mongoose');

const playerInfo = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    userEmail : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

module.exports = playerInfo