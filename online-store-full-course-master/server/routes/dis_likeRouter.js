const Router = require('express')
const router = new Router()
const dis_likeController = require('../controllers/dis_likeController')

router.post('/', dis_likeController.set)

module.exports = router