const Router = require('express')
const router = new Router()
const friendController = require('../controllers/friendController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), friendController.create)
router.get('/', friendController.getAll)

module.exports = router
