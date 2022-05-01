const Router = require('express')
const router = new Router()
const themeController = require('../controllers/themeController')

router.post('/', themeController.create)
router.get('/', themeController.getAll)

module.exports = router
