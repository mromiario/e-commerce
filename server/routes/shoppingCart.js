const router = require('express').Router()
const Controller = require('../controllers/ControllerUser')
const {authentication} = require('../midlleware/auth')

router.use(authentication)
router.patch('/add', Controller.addCart)
router.patch('/delete', Controller.deleteCart)
router.patch('/checkout', Controller.emptyCart)


module.exports = router