const router = require('express').Router()
const Controller = require('../controllers/ControllerTransaction')
const {authentication, authAdmin} = require('../midlleware/auth')

router.use(authentication)
router.post('/',Controller.newTransaction)
router.get('/paid',Controller.paidTransaction)
router.get('/unpaid',Controller.unpaidTransaction)
router.patch('/finish',Controller.confirmCustomer)

router.use(authAdmin)
router.get('/',Controller.allTransaction)
router.patch('/confirm',Controller.adminConfirmTransaction)



module.exports = router