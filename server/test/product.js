process.env.NODE_ENV = 'test';
let Product = require('../models/Product')
let User = require('../models/User')
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
chai.use(chaiHttp);

let token = ''
let productId = ''


after(function(){
    if (process.env.NODE_ENV === 'test') {
        Product
          .deleteMany({})
          .then(function() {
            console.log('Products collection cleared!');
          })
          .catch(function(err) {
            console.log(err);
          });

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
            name : 'lidya',
            email : 'lidya@mail.com',
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
           email: 'lidya@mail.com',
           password: '123'
        })
        .end((err,res)=>{
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.should.be.json;
            res.body.should.have.property('token');
            token = res.body.token
            done()
        })
    })
})


describe('/POST create products',()=>{
    it('it should create new products',(done)=>{
        chai.request(app)
        .post('/api/products')
        .set('token',token)
        .send({
            name : 'kipas angin ajaib',
            stock : 10,
            price : 10000,
            image : '',
            status : 'New',
            description: '',
            seller : ''
        })
        .end((err,res)=>{
            res.should.have.status(201)
            res.body.should.be.a('object')
            res.should.be.json;
            productId = res.body._id
            res.body.should.have.property('name');
            res.body.should.have.property('price');
            res.body.should.have.property('stock')
            done()
        })
    })
})

describe('/GET all products',()=>{
    it('it should get list of all products', (done)=>{
        chai.request(app)
        .get('/api/products')
        .set('token',token)
        .end((err,res)=>{
            res.should.have.status(200)
            res.body.should.be.a('array')
            res.should.be.json;
            done()
        })
    })
})


describe('/GET spesific product',()=>{
    it('should get a product',(done)=>{
        chai.request(app)
        .get('/api/products/'+productId)
        .set('token',token)
        .end((err,res)=>{
            res.should.have.status(200)
            done()
        })
    })
})

describe('/DELETE spesific product',()=>{
    it('it should delete and show delete message',(done)=>{
        chai.request(app)
        .delete('/api/products/'+productId)
        .set('token',token)
        .end((err,res)=>{
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.should.be.json;
            done()

        })
    })
})