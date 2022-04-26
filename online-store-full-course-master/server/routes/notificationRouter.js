const Router = require('express')
const router = new Router()
const notificationController = require('../controllers/notificationController')

router.get('/', notificationController.getAll)


module.exports = router