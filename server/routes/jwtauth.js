var jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt');
var randtoken = require('rand-token')
var newAccessToken = "";

refreshTokens = {}



let generateAccessToken = function (refreshtoken, id) {

    if ((refreshtoken in refreshTokens) && (refreshTokens[refreshtoken] == id)) {
 
        newAccessToken = jwt.sign({ id: id }, process.env.JWT_TOKEN, { expiresIn: process.env.JWT_TOKEN_ACTIVE_TIME })
    }
    return newAccessToken
}

let generateTokens = function (user) {

    var accessToken = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, { expiresIn: process.env.JWT_TOKEN_ACTIVE_TIME })
    var refreshToken = randtoken.uid(256)
    refreshTokens[refreshToken] = user._id

    return { refreshtoken: refreshToken, accesstoken: accessToken }
}


let authorization = function (req, res, next) {
    var token = req.headers.authorization || undefined
    var refreshtoken = req.headers.refreshtoken
    var id = req.headers.id

    if (token) {
        try {
            var tokenVerify = jwt.verify(token, process.env.JWT_TOKEN)
            next()
        }
        catch (error) {

            if (error.message == "invalid token") {
                res.status(401).send()
            }

            else if (error.message == "jwt expired") {
                
                if(refreshtoken == undefined){
                        res.status(401).send()
                }else{
                    newAccessToken = generateAccessToken(refreshtoken, id)
                    res.setHeader('newaccesstoken', generateAccessToken(refreshtoken, id))
                    next()
                }
            } else {
                
                res.status(500).send()
            }
        }
    }
    else {
        
        res.status(401).send()
    }

}

module.exports.authorization = authorization
module.exports.generateAccessToken = generateAccessToken
module.exports.generateTokens = generateTokens
module.exports.newAccessToken = newAccessToken