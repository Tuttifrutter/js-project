const Router = require('express')
const router = new Router()
const imageRouter = require('./imageRouter')
const userRouter = require('./userRouter')
const themeRouter = require('./themeRouter')
const friendRouter = require('./friendRouter')

router.use('/user', userRouter)
router.use('/friend', friendRouter)
router.use('/theme', themeRouter)
router.use('/image', imageRouter)

module.exports = router
