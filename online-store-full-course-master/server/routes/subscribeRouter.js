const Router = require('express')
const router = new Router()
const subscribeController = require('../controllers/subscribeController')

router.post('/', subscribeController.set)
router.get('/', subscribeController.get)

module.exports = router