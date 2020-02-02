var express = require('express');
var router = express.Router();
var verify = require('./jwtauth').authorization
var User = require('../models/users')
var Auth = require('../models/auth')



router.get('/getUsers', verify, async function (req, res) {
  try {

    var userData = await Auth.aggregate([
      {
        "$lookup": {
          "localField": "userdetails",
          "from": "userschemas",
          "foreignField": "_id",
          "as": "userinfo"
        }
      },
      { "$unwind": "$userinfo" },
      {
        "$project": {
          "email": 1,
          "role":1,
          "userinfo": 1
        }
      }
    ])

    res.send(userData)

  } catch (error) {
    res.send(error)
  }
});

router.post('/removeUsers', verify, async function (req, res) {
  try {
    var deleteUser = await User.deleteOne({ _id: req.body.userdata.userinfo._id })
    var deleteAuth = await Auth.deleteOne({ email: req.body.userdata.email })
    res.json({ status: true })
  }
  catch (err) {
    res.status(500).send()
  }
  // var isUserDeleted = await User.remove({email : req.body[0].email})
  // if (isUserDeleted) {
  //   res.json({ status: true, message: 'user deleted..' })
  // } else {
  //   res.status(500).json({ status: false, message: 'Somthing went wrong' })
  // }

})

router.post('/editUsers', verify, async function (req, res) {
  try {
    var userData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      gender: req.body.gender,
      city: req.body.city,
      country: req.body.country,
      phonenumber: req.body.phonenumber
    }

    var userId = await Auth.find({ email: req.body.email })
    var editedUser = await User.update({ _id: userId[0].userdetails }, userData)
    if (editedUser.nModified >= 1) {
      res.json({ status: true })
    } else {
      res.json({ status: false })
    }


  }
  catch (err) {
    res.send(err.stack)
  }

})


module.exports = router;
