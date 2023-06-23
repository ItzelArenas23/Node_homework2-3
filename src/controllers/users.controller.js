const Users = require('./../models/users.model');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const AppError = require('../utils/appError');

exports.findAll = catchAsync(async (req, res, next) => {
  const users = await Users.findAll({
    where: {
      status: 'active',
    },
  });
  return res.status(500).json({
    results: users.length,
    message: 'find all users',
    users,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  //* crear producto con el modelo
  const user = await Users.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: encryptedPassword,
    role,
  });
  //* se espera el token
  const token = await generateJWT(user.id);
  //* enviar R= al usuario
  return res.status(201).json({
    message: 'created user',
    token,
    user: {
      id: user.id,
      name: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  });
});

exports.findUser = catchAsync(async (req, res, next) => {
  //* traer id de la Req del usuario
  const { id } = req.params;
  //* buscar usuario en bd
  const user = await Users.findOne({
    where: {
      id,
      status: 'active',
    },
  });
  //* verificar si el usuario existe
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: `The user with id ${id} not found!`,
    });
  }

  //* R= al cliente
  return res.status(200).json({
    message: 'user finded',
    user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  //* traer prod a actualizar
  const { id } = req.params;
  //* traer del body la info a actualizar
  const { name, email } = req.body;

  //* se busca prod a actializar
  const user = await Users.findOne({
    where: {
      id,
      status: 'active',
    },
  });
  //* verificar si el usuario existe
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: `The user with id ${id} not found!`,
    });
  }
  //* actualizar el usuerio encontrado
  await user.update({
    name,
    email,
  });
  //* enviar R= al usuario
  return res.status(200).json({
    message: 'update user',
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  //* traer el usuario a eliminar
  const { id } = req.params;

  //* buscar usuario
  const user = await Users.findOne({
    where: {
      id,
      status: 'active',
    },
  });
  //* verificar si el usuario existe
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: `The user with id ${id} not found!`,
    });
  }

  //* remover el user encontrado y cambiar status parcial
  await user.update({
    status: 'disabled',
  });
  //* enviar R= al usuario
  return res.status(200).json({
    message: 'delete user',
  });
});
