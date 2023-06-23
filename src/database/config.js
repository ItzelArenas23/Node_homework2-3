const { Sequelize } = require('sequelize');

const db = new Sequelize({
  // dialect: process.env.DB_DIALECT,
  // host: process.env.DB_HOST,
  // username: process.env.DB_USERMAME,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_DATABASE,
  // logging: false,
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'root',
  database: 'motors',
  logging: false,
});

module.exports = { db };

// });

//! pongo aqui en .env porque siempre que lo pasamos se desaparece cosa de hacer el .env y pegar lo siguente, si tienen otro nombre de BD solo reemplazenlo

// PORT=3000
// DB_PASSWORD=root
// DB_DIALECT=postgres
// DB_HOST=localhost
// DB_USERMAME=postgres
// DB_DATABASE=motors
// SECRET_JWT_SEED=YWx1bW5
