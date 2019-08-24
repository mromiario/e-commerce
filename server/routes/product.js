const router = require('express').Router()
const Controller = require('../controllers/ControllerProduct')
const {authentication, authorization} = require('../midlleware/auth')

router.get('/',Controller.findAll)
router.get('/:id',Controller.findOne)


router.use(authentication)
router.post('/',Controller.create)
router.get('/sell/list',Controller.findMine)
router.delete('/:id',authorization,Controller.deleteItem)
router.patch('/:id',authorization,Controller.update)


module.exports = router