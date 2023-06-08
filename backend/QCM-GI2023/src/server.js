

// Load .env Enviroment Variables to process.env

require('mandatoryenv').load([
    'PROD_URL',
    'PORT',
    'SECRET'
]);

const { PORT } = process.env;

const app = require ("./app")

//Cors
const cors = require('cors');
const corsOptions = {
    origin: '*'
  };




// Open Server on selected Port
app.listen(
    PORT,
    () => console.info('Server listening on port ', PORT)
);