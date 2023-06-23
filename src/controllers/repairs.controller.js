const Repairs = require('../models/repairs.model');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/users.model');

exports.findAll = catchAsync(async (req, res, next) => {
  const repairs = await Repairs.findAll({
    where: {
      status: 'pending',
    },
    attributes: {
      include: ['userId', 'status'],
    },
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email', 'status'],
      },
    ],
  });

  return res.status(200).json({
    results: repairs.length,
    message: 'find all repairs',
    repairs,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const { date, motorsNumber, description } = req.body;
  const { id } = req.sessionUser;

  const repair = await Repairs.create({
    motorsNumber,
    date,
    description,
    status: 'pending',
    userId: id,
  });
  return res.status(201).json({
    message: 'create repair',
    repair,
  });
});

exports.findRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repairs.findOne({
    where: {
      id,
      status: 'pending',
    },
  });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: `The repair with id ${id} not found!`,
    });
  }

  return res.status(200).json({
    message: 'find repair',
    repair,
  });
});

exports.updateRepair = catchAsync(async (req, res, next) => {
  //* traer repair  a actualizar
  const { id } = req.params;
  //* traer del body la info a actualizar
  const { status } = req.body;
  //* buscar la repair que se va a actualizar
  const repair = await Repairs.findOne({
    where: {
      id,
      status: 'pending',
    },
  });
  //* Verificar si la repair existe
  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: `The repair with id ${id} not found!`,
    });
  }

  //* actualizar la repair
  await repair.update({ status });

  return res.status(200).json({
    message: 'update repair',
  });
});

exports.deleteRepair = catchAsync(async (req, res, next) => {
  //* traer repair por id y parametros dle usuario
  const { id } = req.params;
  //* buscar producto
  const repair = await Repairs.findOne({
    where: {
      id,
      status: 'pending',
    },
  });
  //* Verificar si la repair existe
  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: `The repair with id ${id} not found!`,
    });
  }

  //* actualizar la repair encontrada y cambiar el status a  cancel/false elim parcial
  await repair.update({ status: 'cancelled' });
  //* enviar R= al cliente

  return res.status(200).json({
    message: 'the repair its cancel now ',
  });
});
