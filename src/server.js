require('dotenv').config();
const { db } = require('./database/config');
const app = require('./app');

const initModel = require('./models/initModels');

db.authenticate()
  .then(() => console.log('Database authenticated'))
  .catch((err) => console.log(err));

initModel();

db.sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log('Server running on port 3000 😘');
});
