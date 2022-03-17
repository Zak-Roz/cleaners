const router = require('express').Router();

const authRouter = require('./auth');
router.use('/auth', authRouter);

const userRouter = require('./user');
router.use('/user', userRouter);

const orderRouter = require('./order');
router.use('/order', orderRouter);

const cleanersRouter = require('./cleaner');
router.use('/cleaners', cleanersRouter);

module.exports = router;