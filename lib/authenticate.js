const { verify, sign } = require('./jwt');

function authenticate(req,res,next){
    const { token } = req.headers
    verify(token)
    .then(decoded =>{
        req.userId = decoded._id
        return sign({_id: decoded._id})
    })
    .then(newToken=>{
        req.token = newToken
        next();
    })
    .catch(err=> {
        return res.send({
            success: false,
            data: null,
            message: err.message
        })
    })
}
module.exports = { authenticate }