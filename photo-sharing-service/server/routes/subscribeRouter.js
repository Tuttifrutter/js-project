const Router = require('express')
const router = new Router()
const subscribeController = require('../controllers/subscribeController')

router.post('/', subscribeController.set)
router.get('/', subscribeController.get)
router.get('/rs', subscribeController.getrs)
router.get('/ornot', subscribeController.getornot)
module.exports = router