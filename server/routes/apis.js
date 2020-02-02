var express = require('express');
var router = express.Router();
var verify = require('./jwtauth').authorization
var User = require('../models/users')
var Auth = require('../models/auth')
var authModule = require('./jwtauth')
const uuidv1 = require('uuid/v1');


router.get('/token',function(req,res){
    var id = uuidv1()
    var user = {
        _id : id
    }
    let token = authModule.generateTokens(user)
    res.json({ success: true, accesstoken: token.accesstoken, id:user._id })
})

router.get('/users/age',verify, async function (req, res) {
    try {
        var usersByAge = await User.aggregate([
            {
                "$group": {
                    "_id": {
                        "$concat": [
                            { "$cond": [ { "$lte": [ "$age", 0 ] }, "Unknown", ""] },
                            { "$cond": [ { "$and": [ { "$gt":  ["$age", 0 ] }, { "$lt": ["$age", 10] } ]}, "Under 10", ""] },
                            { "$cond": [ { "$and": [ { "$gte": ["$age", 10] }, { "$lt": ["$age", 31] } ]}, "10 - 30", ""] },
                            { "$cond": [ { "$and": [ { "$gte": ["$age", 31] }, { "$lt": ["$age", 51] } ]}, "31 - 50", ""] },
                            { "$cond": [ { "$and": [ { "$gte": ["$age", 51] }, { "$lt": ["$age", 71] } ]}, "51 - 70", ""] },
                            { "$cond": [ { "$gte": [ "$age", 71 ] }, "70+", ""] }
                        ]
                    },
                    "noofpeople": { "$sum": 1 }
                }
            }
        ])
        res.send(usersByAge)
    } catch (error) {
        res.status(500).send(error)
    }

})


router.get('/users/gender',verify, async function (req, res) {
    try {
        var usersByGender = await User.aggregate([
            {
                $group: {
                    _id: "$gender",
                    count: { $sum: 1 }
                }
            }
        ])
        res.send(usersByGender)
    } catch (error) {
        res.status(500).send(error)
    }

})

router.get('/users/country', verify, async function (req, res) {
    try {
        var usersByCountry = await User.aggregate([
            {
                $group: {
                    _id: "$country",
                    count: { $sum: 1 }
                }
            }
        ])
        res.send(usersByCountry)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/users/city', verify, async function (req, res) {
    try {
        var usersBycity = await User.aggregate([
            {
                $group: {
                    _id: "$city",
                    count: { $sum: 1 }
                }
            }
        ])
        res.send(usersBycity)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router