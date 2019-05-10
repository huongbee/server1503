const mongoose = require('mongoose');
const { hash, compare } = require('../lib/bcrypt');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    email: { type: String, unique: true, required: true},
    password: String,
    name: String,
    posts: [
        {type: Schema.Types.ObjectId, ref: 'post'}
    ],
    friends: [
        {type: Schema.Types.ObjectId, ref: 'user'}
    ],
    receiveRequests: [
        {type: Schema.Types.ObjectId, ref: 'user'}
    ],
    sendRequests: [
        {type: Schema.Types.ObjectId, ref: 'user'}
    ]
})
const UserModel = mongoose.model('user',UserSchema);
class User{
    static signUp(email, name, password){
        return new Promise((resolve, reject)=>{
            hash(password)
            .then(passwordHash => UserModel.create({email, name, password: passwordHash}))
            .then(user=>{
                // delete user.password
                return resolve(user)
            })
            .catch(err=>reject(err))
        })
    }
}
module.exports = { UserModel, User }