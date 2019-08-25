const Transaction = require('../models/Transaction')
const Product = require('../models/Product')
class controllerTransaction {
    static newTransaction (req,res,next) {
        Product.findById(req.body.product)
        .then(pro=>{
            if(pro){
                if(pro.stock >= req.body.qty){
                    Transaction.create({
                        User: req.decoded._id,
                        product: req.body.product,
                        qty: req.body.qty,
                        total: req.body.qty*pro.price
                    })
                    .then(data =>{
                        res.status(201).json(data)
                        return Product.update({_id:pro._id},{stock : pro.stock-req.body.qty})
                    })
                    .then(()=>{
                        res.json({message : 'produt qty updated'})
                    })
                    .catch(err=>{
                        next(err)
                    })
                } else{
                    res.status(404).json({message: "product is not available"})
                }

            }else{
                res.status(404).json({message : "product is not found"})
            }
        })
        .catch(err=>{
            next(err)
        })
    }

    static paidTransaction(req,res,next){
        Transaction.find({User: req.decoded._id, paymentStatus: true, finishStatus: false})
        .populate({
            path : 'product',
            populate: {path: 'seller', select: 'name'}
        })
        .sort({created_at : -1})
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static unpaidTransaction(req,res,next){
        Transaction.find({User: req.decoded._id, paymentStatus: false})
        .populate({
            path : 'product',
            populate: {path: 'seller', select: 'name'}
        })
        .sort({created_at : -1})
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            next(err)
        })

    }

    static adminConfirmTransaction(req,res,next){
        Transaction.update({_id:req.body.id},{paymentStatus: true})
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            next(err)
        })

    }

    static confirmCustomer (req,res,next) {
        Transaction.update({_id:req.body.id},{finishStatus: true})
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            next(err)
        })

    }

    static allTransaction (req,res,next) {
        Transaction.find()
        .sort({created_at : -1})
        .populate({
            path : 'product',
            populate: {path: 'seller', select: 'name'}
        })
        .populate('User','name')
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            next(err)
        })


    }


}

module.exports = controllerTransaction