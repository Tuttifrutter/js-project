const Router = require('express')
const router = new Router()
const imageController = require('../controllers/imageController')

router.post('/', imageController.create)
router.get('/', imageController.getAll)
router.get('/:id', imageController.getOne)

module.exports = router
