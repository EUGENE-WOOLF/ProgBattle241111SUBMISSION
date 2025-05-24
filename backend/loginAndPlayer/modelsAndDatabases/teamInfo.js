const mongoose = require('mongoose');
const playerInfo = require('./playerInfo'); // This is a Schema


// team are to be registered
const teamInfo = new mongoose.Schema({
    teamName: {
        type: String,
        required: true,
        unique: true
    },
    members: {
        type: [playerInfo],
        validate: {
            validator: function(arr) {
                return arr.length === 4;
            },
            message: 'A team must have exactly 4 members.'
        }
    },
});

module.exports =  teamInfo
