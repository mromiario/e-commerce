const jwt = require('../helper/jwt')
const Product = require('../models/Product')
const User = require('../models/User')
function authentication(req,res,next){
    try {
        let decoded = jwt.verifyToken(req.headers.token);
        req.decoded = decoded
        next()
      } catch(err) {
        next(err)
      }
}

function authorization(req,res,next){
    Product.findById(req.params.id)
        .then(product=>{
            if(product){
                if(product.seller == req.decoded._id){
                    next()
                }else{
                    res.status(401).json({message : 'Unauthorized user'})
                }
            }else{
                res.status(404).json({message: 'article is not found'})
            }
        })
        .catch(err=>{
            next(err)
        })

}

function authorizationUser (req,res,next) {
    User.findById(req.params.id)
        .then(data=>{
            if(data){
                if(data._id == req.decoded._id){
                    next()
                }else{
                    res.status(401).json({message : 'Unauthorized user'})
                }
            }else{
                res.status(404).json({message: 'user is not found'})
            }
        })
        .catch(err=>{
            next(err)
        })

}

module.exports = {
    authentication,
    authorization,
    authorizationUser
}