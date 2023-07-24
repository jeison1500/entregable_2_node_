const app = require('./app');
const { db } = require('./database/config');

db.authenticate()
  .then(() => {
    console.log('Database connected...🤗');
  })
  .catch((err) => {
    console.log('Error: ', err);
  });

db.sync()
  .then(() => {
    console.log('Database synced...🤭');
  })
  .catch((err) => {
    console.log('Error: ', err);
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...😎`);
});
