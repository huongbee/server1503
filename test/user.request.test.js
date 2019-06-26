const request = require('supertest')
const { equal } = require('assert')
const { User, UserModel } = require('../models/User');
const app = require('../app')

describe('POST /user/check-user',()=>{
    let token;
    beforeEach(async()=>{
        await UserModel.deleteMany({})
        await User.signUp('huong@gmail.com','huong','111111')
        const user = await User.signIn('huong@gmail.com','111111')
        token = user.token 
    })
    it('Check token',async ()=>{
        const response = await request(app)
                        .post('/user/check-user', {})
                        .set('token', token)
        const body = response.body
        equal(body.success, true)
    })
})