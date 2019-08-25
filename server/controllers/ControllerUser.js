const bcrypt = require('../helper/bcrypt')
const jwt = require('../helper/jwt')
const User = require('../models/User')

class controllerUser{
    static dataUser(req,res,next){
        User.findById(req.decoded._id)
        .populate({
            path : 'Cart',
            populate : {path: 'seller' , select: "name"}
        })
        .then(data=>{
            let dataSend = {
                name : data.name,
                email : data.email,
                cart: data.Cart,
            }
            res.json(dataSend)
        })
        .catch(err=>{
            next(err)
        })
    }
    static create(req,res,next){
        let {name,email,password} = req.body
        password = bcrypt.hashPassword(password)
        User.create({
            name,
            email,
            password
        })
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
    
    static login(req,res,next){
        const{email,password} = req.body
        User.findOne({email})
            .then(data=>{
                if(data){
                    if(bcrypt.comparePassword(password,data.password)){
                        const {_id, name,email,birthday_date} = data
                        req.headers.token = jwt.generateToken({_id,name,email,birthday_date})
                        res.json({token : req.headers.token})
                    }else{
                        res.status(404).json({message : 'invalid password/username'})
                    }  
                }else{
                    res.status(404).json({message : 'invalid password/username'})
                }
            })
            .catch(err=>{
                next(err)
            })
    }

    static addCart (req,res,next) {
        User.update({_id:req.decoded._id}, {$push : {"Cart" : req.body.cart}})
        .then(data=>{
            res.json(data)
        })
        .catch(err=> next(err))
    }

    static deleteCart (req,res,next) {
        User.update({_id:req.decoded._id}, {$pull : {"Cart" : req.body.cart}})
        .then(data=>{
            res.json(data)
        })
        .catch(err=> next(err))
    }

    static emptyCart (req,res,next) {
        User.update({_id:req.decoded._id}, {$set : {"Cart" : []}})
        .then(data=>{
            res.json(data)
        })
        .catch(err=> next(err))
    }

}

module.exports = controllerUser