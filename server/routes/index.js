var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
var authModule = require('./jwtauth')

var Auth = require('../models/auth')
var User = require('../models/users')

router.post('/login', async (req, res) => {

  const user = await Auth.findOne({ email: req.body.email })
  if (user) {
    bcrypt.compare(req.body.password, user.password).then((status) => {
      if (!status) {
        res.json({ status: false })
      } else {
        let token = authModule.generateTokens(user)      
        res.json({ success: true, accesstoken: token.accesstoken, refreshtoken: token.refreshtoken, id:user._id })
      }
    }).catch((error) => {
      console.log(error);
    })
  } else {
    res.json({ status: false })
  }
})



router.post('/register', async function (req, res, next) {
  let salt;
  let hashPassword;
  let checkUser;
  try {
    checkUser = await Auth.findOne({ email: req.body.email })
    if (checkUser) {
      return res.json({ status: false, message: "User is already exists" })
    }

    salt = await bcrypt.genSalt(10)
    hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      gender: req.body.gender,
      city: req.body.city,
      country: req.body.country,
      phonenumber: req.body.phonenumber
    })

    var savedUserDetails = await user.save()

    const auth = new Auth({
      email: req.body.email,
      password: hashPassword,
      userdetails: savedUserDetails._id,
      role: 'user'
      // role: req.body.role
    })

    await auth.save()

    res.json({ status: true })

  } catch (error) {
    res.status(500).send(error.stack)
  }

});

module.exports = router;
