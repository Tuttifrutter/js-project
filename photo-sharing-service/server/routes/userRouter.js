const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/info',userController.info)
router.post('/userinfo',userController.userInfo)
router.get('/auth', authMiddleware, userController.check)
router.post('/status', userController.setStatus)
router.get('/all', userController.getAllUsers)
module.exports = router
