const router = require('express').Router()
const userRouter = require('./userRouter')
const authRouter = require('./authRouter')
const kitchenStoreRouter = require('./kitchenStoreRouter')
const roomRouter = require('./roomRouter')
const menuRouter = require('./menuRouter')
const rawMaterialRouter = require('./rawMaterialRouter')
const transactionRouter = require('./transactionRouter')
const logRawMaterialRouter = require('./logRawMaterialRouter')
const { authentication } = require('../middleware/authentication')
const errorHandler = require('../middleware/errorHandler')

router.use('/auths', authRouter)

router.use(authentication)

router.use('/users', userRouter)
router.use('/kitchen-stores', kitchenStoreRouter)
router.use('/rooms', roomRouter)
router.use('/menus', menuRouter)
router.use('/raw-materials', rawMaterialRouter)
router.use('/transactions', transactionRouter)
router.use('/log-raw-materials', logRawMaterialRouter)

router.use(errorHandler)

module.exports = router