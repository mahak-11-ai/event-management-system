const express = require('express');
 
const router  = express.Router() ;
console.log(require('../controllers/user.controller.js'))
const {register , login} = require('../controllers/user.controller.js')
 
router.post('/register' ,  register ) ;
router.post('/login', login);
 
module.exports = router ;

