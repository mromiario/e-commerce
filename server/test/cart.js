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

describe('/POST register use for new product',()=>{
    it('it should create new user for new producr',(done)=>{
        chai.request(app)
        .post('/api/users/register')
        .send({
            name : 'lidyo',
            email : 'lidyo@mail.com',
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


describe('/POST login user for new product',()=>{
    it('it should logged in user for new product',(done)=>{
        chai.request(app)
        .post('/api/users/login')
        .send({
           email: 'lidyo@mail.com',
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


describe('/POST create products by user',()=>{
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



describe('/POST register user for new cart',()=>{
    it('it should create new user for new cart',(done)=>{
        chai.request(app)
        .post('/api/users/register')
        .send({
            name : 'romi',
            email : 'romi@mail.com',
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


describe('/POST login user for new cart',()=>{
    it('it should logged in user for add cart',(done)=>{
        chai.request(app)
        .post('/api/users/login')
        .send({
           email: 'romi@mail.com',
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


describe('/PATCH add cart',()=>{
    it('it should add new cart',(done)=>{
        chai.request(app)
        .patch('/api/cart/add')
        .set('token',token)
        .send({
            Cart : productId
        })
        .end((err,res)=>{
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.should.be.json;
            res.body.should.have.property('nModified');
            done()
        })
    })
})

describe('/PATCH delete cart',()=>{
    it('it should delete one element of cart',(done)=>{
        chai.request(app)
        .patch('/api/cart/delete')
        .set('token',token)
        .send({
            Cart : productId
        })
        .end((err,res)=>{
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.should.be.json;
            res.body.should.have.property('nModified');
            done()
        })
    })
})

describe('/PATCH checkout cart',()=>{
    it('it should delete all element of cart',(done)=>{
        chai.request(app)
        .patch('/api/cart/checkout')
        .set('token',token)
        .send({
            Cart : productId
        })
        .end((err,res)=>{
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.should.be.json;
            res.body.should.have.property('nModified');
            done()
        })
    })
})






