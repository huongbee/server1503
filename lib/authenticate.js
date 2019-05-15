const { verify } = require('./jwt');

function authenticate(req,res,next){
    const { token } = req.headers
    verify(token)
    .then(decoded => {
        req.userId = decoded._id
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