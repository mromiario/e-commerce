process.env.NODE_ENV = 'test';

let User = require('../models/User')
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);


describe('/POST regiter user',()=>{
    it('it should create new user',(done)=>{
        chai.request(app)
        .post('/api/users/register')
        .send({
            name : 'lidya',
            email : 'lidya@mail.com',
            password : '123',
        })
        .end((err,res)=>{
            res.should.have.status(201)
            res.body.should.be.a('object')
            res.should.be.json;
            // res.body.should.have.property('name');
            // res.body.should.have.property('email');
            // res.body.should.have.property('password')
            done()
        })
    })
})


describe('/POST login user',()=>{
    it('it should logged in user',(done)=>{
        chai.request(app)
        .post('/api/users/login')
        .send({
           email: 'utomo@mail.com',
           password: '123'
        })
        .end((err,res)=>{
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.should.be.json;
            res.body.should.have.property('token');
            done()
        })
    })
})
