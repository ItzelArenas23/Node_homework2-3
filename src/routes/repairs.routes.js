const express = require('express');
//*validaciones
const validationMiddleware = require('../middlewares/validations.middleware');

//* controladores
const repairsController = require('./../controllers/repairs.controller');

//* middlewares
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

//* proteccion

router.use(authMiddleware.protect);

router
  .route('/')
  .get(repairsController.findAll)
  .post(validationMiddleware.createRepairsValidation, repairsController.create);

//* proteccion a solo employee
//* router.use(authMiddleware.restrictTo('employee')) esta seria una forma

router
  .route('/:id')
  .get(authMiddleware.restrictTo('employee'), repairsController.findRepair)
  .patch(authMiddleware.restrictTo('employee'), repairsController.updateRepair)
  .delete(
    authMiddleware.restrictTo('employee'),
    repairsController.deleteRepair
  );

module.exports = router;
