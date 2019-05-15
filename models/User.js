const mongoose = require('mongoose');
const { hash, compare } = require('../lib/bcrypt');
const { sign, verify } = require('../lib/jwt')

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
                    return sign({_id: user._id})
                    .then(token=>{
                        return resolve({
                            user: {
                                _id: user._id,
                                email: user.email,
                                name: user.name
                            },
                            token
                        })
                    })
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
        //sign token
        const token = await sign({ _id: user.id})
        if(!token) throw new Error('Something wrong!')
        return { 
            user: {
                _id: user._id,
                email: user.email,
                name: user.name
            },
            token
        };
    }
    static async addFriend(idSender, idReceiver){
        const sender = await UserModel.findOneAndUpdate(
            { _id: idSender },
            { $addToSet: { sendRequests: idReceiver } },
            { new:true })
        if(!sender) throw new Error('Cannot update sender!')
        const receiver = await UserModel.findOneAndUpdate(
            { _id: idReceiver},
            { $addToSet: { receiveRequests: idSender}},
            { new:true }
        )
        if(!receiver) throw new Error('Cannot update receiver!')
        return { 
            sender: {
                _id: sender._id,
                name: sender.name,
                email: sender.email,
                sendRequests: sender.sendRequests
            },
            receiver: {
                _id: receiver._id,
                name: receiver.name,
                email: receiver.email,
                receiveRequests: receiver.receiveRequests
            }
         }
    }
    static async acceptFriend(userId, acceptId){
        const user01 = await UserModel.findOneAndUpdate(
            {_id: userId},
            { 
                $addToSet: { friends: acceptId},
                $pull: {receiveRequests: acceptId}
            },
            {new: true}
        )
        if(!user01) throw new Error('Cannot update user!')
        const otherUser = await UserModel.findOneAndUpdate(
            { _id: acceptId},
            {
                $addToSet: { friends: userId},
                $pull: {sendRequests: userId}     
            },
            {new: true}
        )
        if(!otherUser) throw new Error('Cannot update other user!')
        return { 
            user: {
                _id: user01._id,
                name: user01.name,
                email: user01.email,
                receiveRequests: user01.receiveRequests,
                friends: user01.friends 
            },
            otherUser: {
                _id: otherUser._id,
                name: otherUser.name,
                email: otherUser.email,
                sendRequests: otherUser.sendRequests,
                friends: otherUser.friends 
            }
         }    
    }
}
module.exports = { UserModel, User }