const controller = require('../controllers/auth.controller');
const authRouter = require('express').Router();

authRouter
  .use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  })
  .post(
    '/signup',
    controller.signup
  )
  .post('/signin', controller.signin)
  .get('/updateStorage', controller.updateStorage);

module.exports = authRouter;