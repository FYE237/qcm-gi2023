
const {
    PROD_URL,
    DEV_DB_URL,
} = process.env;


//Database url depends if we are in test environnement or prod-environnement
const DB_URL = process.env.NODE_ENV === 'dev' ? DEV_DB_URL : PROD_URL;

const mongoose = require("mongoose");

mongoose.connect(DB_URL,  { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


module.exports = mongoose;
