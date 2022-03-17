const { authJwt } = require('../middleware');

const controller = require('../controllers/user.controller');
const userRouter = require('express').Router();

userRouter
  .use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  })
  .get('/all', controller.allAccess)
  .get('/allUsers', controller.allUsers)
  .get('/getAllByAdmin', controller.getAllByAdmin)
  .get('/getById', controller.getById)
  .put('/updatePass',controller.updatePass)
  .put('/forgotPass',controller.forgotPass)
  .put('/changeWallet',
    controller.changeWallet)
  .get('/user',
    [
      authJwt.verifyToken,
    ],
    controller.userBoard)
  .get('/admin',
    [
      authJwt.verifyToken, 
      authJwt.isAdmin,
    ],
    controller.adminBoard);

module.exports = userRouter;