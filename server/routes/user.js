const router = require('express').Router()
const Controller = require('../controllers/ControllerUser')
const {authentication} = require('../midlleware/auth')
router.get('/',authentication,Controller.dataUser)
router.post('/register',Controller.create)
router.post('/login',Controller.login)



module.exports = router