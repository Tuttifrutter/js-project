const Router = require('express')
const router = new Router()
const imageRouter = require('./imageRouter')
const userRouter = require('./userRouter')
const themeRouter = require('./themeRouter')
const friendRouter = require('./friendRouter')
const commentRouter = require('./commentRouter')
const dis_likeRouter = require('./dis_likeRouter')

router.use('/user', userRouter)
router.use('/friend', friendRouter)
router.use('/theme', themeRouter)
router.use('/image', imageRouter)
router.use('/dis_like', dis_likeRouter)
router.use('/comment',commentRouter)

module.exports = router
