const { User, UserModel } = require('../models/User');
const { equal } = require('assert');

require('../lib/connectdb');

describe('check user', () => {
    
    beforeEach(async()=>{
        await UserModel.deleteMany({}); 
    }) 
    let _id;
    beforeEach(async()=>{
        await User.signUp('huong@gmail.com', 'Huong', '111111')
        user = await User.signIn('huong@gmail.com','111111')
        _id = user.user._id
    })
    it('Check user', async () => {
        const userInfo = await User.getUser(_id);
        expect(userInfo).toStrictEqual({ _id: _id, name:'Huong', email:'huong@gmail.com' })
    })
    
    it('Check user if id none ObjectId', async () => {
        try {
            User.getUser('a');
        } catch (error) {
            expect(error.message).toBe('Id invalid')
        }
    })
});

describe('User sign up',()=>{
    beforeEach(async ()=>{
        await UserModel.remove({})
    })
    it('User can sign up',async ()=>{
        const user = await User.signUp('huong@gmail.com','Huong','111111')
        equal(user.name, 'Huong')
        equal(user.email, 'huong@gmail.com')
    })
    it('User sign up missing email',async ()=>{
        try {
            await User.signUp(null,'Huong','111111')
        } catch (error) {
            equal(error.message, 'Missing email')
        }
    })
})