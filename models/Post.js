const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { UserModel } = require('./User');

const PostSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'user'},
    content: String,
    likes: [
        { type: Schema.Types.ObjectId, ref: 'user'}
    ],
    comments: [
        { type: Schema.Types.ObjectId, ref: 'comment'}
    ]
})
const PostModel = mongoose.model('post',PostSchema);
class Post{
    static async createPost(author, content){
        const post = await PostModel.create({author, content})
        if(!post) throw new Error('Cannot create post!');
        const user = await UserModel.findOneAndUpdate(
            { _id: author},
            { $addToSet: { posts: post._id} },
            { new: true}
        )
        if(!user){
            await PostModel.findByIdAndRemove(post._id)
            throw new Error('Cannot update user!');
        }
        return post;
    }
}
module.exports = { PostModel, Post }