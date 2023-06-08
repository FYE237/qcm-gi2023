const express = require('express');
const router = express.Router();


const game = require('../controllers/game.js');



//router.get('/api/users/:id', user.getUserByName);

//router.get('/api/users', user.getUsers);

router.post('/api/game', game.newGame);

//router.delete('/users/:id', user.deleteUser);



module.exports = router;