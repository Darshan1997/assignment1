var mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    phonenumber: {
        type: String,
        max : 10
    }

})

module.exports = mongoose.model("UserSchema",UserSchema)