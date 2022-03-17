const controller = require('../controllers/order.controller');
const orderRouter = require('express').Router();

orderRouter
  .use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  })
  .get('/getById', controller.getById)
  .get('/getAllByUser', controller.getAllByUser)
  .get('/getAllByAdmin', controller.getAllByAdmin)
  .put('/update', controller.update)
  .get('/closeOrder', controller.closeOrder)
  .post('/new',
    controller.create
  );

module.exports = orderRouter;