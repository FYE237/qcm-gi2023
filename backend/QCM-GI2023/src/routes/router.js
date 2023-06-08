const router = require('express').Router();


// Users routes

router.use(require('./user'));


//Game routes
router.use(require('./game'));


module.exports = router;