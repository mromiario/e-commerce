process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");


let Product = require('../models/Product')
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Products',()=>{
    afterEach((done)=>{
        Product.deleteMany({},err=>{
            done()
        })
    })
})

describe('/POST create products',()=>{
    it('it should create new products',(done)=>{
        chai.request(app)
        .post('/api/products')
        .send({
            name : 'kipas angin ajaib',
            stock : 10,
            price : 10000,
            shop : 'hsmsnknxnckckc'
        })
        .end((err,res)=>{
            res.should.have.status(201)
            res.body.should.be.a('object')
            res.should.be.json;
            res.body.should.have.property('name');
            res.body.should.have.property('price');
            res.body.should.have.property('stock')
            res.body.should.have.property('shop')
            done()
        })
    })
})

describe('/GET all products',()=>{
    it('it should get list of all products', (done)=>{
        chai.request(app)
        .get('/api/products')
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
        .get('/api/products/5d5a78355942b5ce959f9b54')
        // .query({id:'5d5a78355942b5ce959f9b54'})
        .end((err,res)=>{
            res.should.have.status(200)
            done()
        })
    })
})

describe('/DELETE spesific product',()=>{
    it('it should delete and show delete message',(done)=>{
        chai.request(app)
        .delete('/api/products/5d5a78355942b5ce959f9b54')
        .end((err,res)=>{
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.should.be.json;
            done()

        })
    })
})