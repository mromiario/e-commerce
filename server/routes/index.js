const router = require('express').Router()
const product = require('./product')
const user = require('./user')
const image = require('./image')
const shoppingCart = require('./shoppingCart')

router.use('/products',product)
router.use('/users',user)
router.use('/images',image)
router.use('/cart', shoppingCart)


module.exports = router