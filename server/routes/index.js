const router = require('express').Router()
const product = require('./product')
const user = require('./user')
const image = require('./image')
const shoppingCart = require('./shoppingCart')
const transaction = require('./transaction')

router.use('/products',product)
router.use('/users',user)
router.use('/images',image)
router.use('/cart', shoppingCart)
router.use('/transactions', transaction)


module.exports = router