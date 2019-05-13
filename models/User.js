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
    static signIn(email, password){
        return new Promise((resolve, reject)=>{
            UserModel.findOne({ email })
            .then(user=>{
                if(!user) return reject(new Error('Cannot find email!'))
                return compare(password, user.password)
                .then(result=>{
                    if(!result) return reject(new Error('Password invalid!'))
                    return resolve(user)
                })
            })
            .catch(err => {
                return reject(err)
            })
        })
    }
    static async login(email, password){
        const user = await UserModel.findOne({ email });
        if(!user) throw new Error('Cannot find user!');
        const check = await compare(password, user.password)
        if(!check) throw new Error('Password invalid!')
        return user;
    }
}
module.exports = { UserModel, User }