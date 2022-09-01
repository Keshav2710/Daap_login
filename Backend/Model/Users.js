const mongoose  = require("mongoose");

const Users = mongoose.Schema({
    userID:{
        type: String,
        require: true
    },
    Name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    DOB:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Users', Users);