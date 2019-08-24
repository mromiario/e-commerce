const Product = require('../models/Product')
class ControllerProduct{
    static findAll(req,res,next){
        Product.find()
        .then(data=>{
            res.json(data)
        })
        .catch(err=>next(err))
        
    }

    static findMine(req,res,next){
        Product.find({seller : req.decoded._id})
        .then(data=>{
            res.json(data)
        })
        .catch(err=>next(err))
        
    }

    static findOne(req,res,next){
        Product.findOne({_id: req.params.id})
        .populate('seller','name')
        .then(data=>{
            res.json(data)
        })
        .catch(err=>next(err))
    }

    static create(req,res,next){
        const {name, stock, price, image} = req.body
        Product.create({ name , stock , price, image, seller : req.decoded._id})
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static deleteItem(req,res,next){
        Product.deleteOne({_id : req.params.id})
        .then(data=>{
            res.json({message:'data has been deleted'})
        })
        .catch(err=>{
            next(err)
        })
    }

    static update(req,res,next){
        let newBody = {}
        const {name, stock, price, image} = req.body
        console.log(req.body);
        if(name) newBody.name = name
        if(stock) newBody.stock = stock
        if(price) newBody.price = price
        if(image) newBody.image = image

        Product.update({_id:req.params.id},newBody)
        .then(data=>{
            res.json(data)
        })
        .catch(err=> next(err))
    }
}

module.exports = ControllerProduct