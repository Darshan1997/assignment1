var mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    email : {
        type : String,
        require : true,
    },
    password : {
        type : String,
        required : true,
        max : 5000
    },
    role:{
        type : String,
        require : true
    },
    userdetails:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserSchema'
    }
})

module.exports = mongoose.model('AuthSchema',authSchema)