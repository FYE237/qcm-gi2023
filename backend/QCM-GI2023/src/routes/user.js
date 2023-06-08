const express = require('express');
const router = express.Router();


const user = require('../controllers/user.js');



//router.get('/api/users/:id', user.getUserByName);

//router.get('/api/users', user.getUsers);

router.post('/api/users', user.newUser);

//router.delete('/users/:id', user.deleteUser);



module.exports = router;