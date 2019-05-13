const { verify } = require('./jwt');

function authenticate(req,res,next){
    const { token } = req.headers
    verify(token)
    .then(decoded => {
        console.log(decoded)
        next();
    })
    .catch(err=> {
        console.log(err.message);
        throw new Error(err.message)
    })
}
module.exports = { authenticate }