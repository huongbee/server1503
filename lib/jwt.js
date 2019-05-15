const jwt = require('jsonwebtoken');
const jwtBlacklist = require('jwt-blacklist')(jwt);
const SECRET_KEY = 'chuoibaomatnaodo';

async function sign(obj){
    const token = await jwt.sign(obj,SECRET_KEY,{expiresIn:6000})
    return token;
}
async function verify(token){
    const decoded = await jwt.verify(token,SECRET_KEY)
    return decoded;
}
function blacklist(token){
    return jwtBlacklist.blacklist(token);
}
module.exports = { sign, verify, blacklist }
