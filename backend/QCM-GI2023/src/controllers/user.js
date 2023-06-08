const status = require('http-status');

const User = require('../models/users.js');

const CodeError = require('../util/codeError.js');
const has = require('has-keys');


module.exports = {   
    async newUser(req, res){
        try {
            
            if(!req.body.name)
                {
                    throw new CodeError("user name not specified")
                } 
            
            const user = new User({name: req.body.name});

            const data = await user.save();

            res.status(200);
            res.json({status: true, message: 'User created succesfully'})

        } catch (error) {
            if(error.code === 1100)
                {
                    res.status(400);
                    res.json({status: false, message: 'Duplicate user'})
                }
            
            else 
                {
                    res.status(400);
                    res.json({status: false, message: 'user name not specified'})
                }    
        }
       
    },
    
}
