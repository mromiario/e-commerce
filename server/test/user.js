process.env.NODE_ENV = 'test';
let User = require('../models/User')
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
let token = ''

chai.use(chaiHttp);


after(function(){
    if (process.env.NODE_ENV === 'test') {
        User
          .deleteMany({})
          .then(function() {
            console.log('Users collection cleared!');
          })
          .catch(function(err) {
            console.log(err);
          });
      }

})


describe('/POST register user',()=>{
    it('it should create new user',(done)=>{
        chai.request(app)
        .post('/api/users/register')
        .send({
            name : 'tomi',
            email : 'tomi@mail.com',
            password : '123',
        })
        .end((err,res)=>{
            res.should.have.status(201)
            res.body.should.be.a('object')
            res.should.be.json;
            res.body.should.have.property('name');
            res.body.should.have.property('email');
            res.body.should.have.property('password')
            done()
        })
    })
})


describe('/POST login user',()=>{
    it('it should logged in user',(done)=>{
        chai.request(app)
        .post('/api/users/login')
        .send({
           email: 'tomi@mail.com',
           password: '123'
        })
        .end((err,res)=>{
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.should.be.json;
            token = res.body.token
            res.body.should.have.property('token');
            done()
        })
    })
})

describe('/GET get  data user that logged in',()=>{
    it('it should logged in user',(done)=>{
        chai.request(app)
        .get('/api/users/')
        .set('token',token)
        .end((err,res)=>{
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.should.be.json;
            res.body.should.have.property('name');
            res.body.should.have.property('email');
            res.body.should.have.property('cart');
            done()
        })
    })
})