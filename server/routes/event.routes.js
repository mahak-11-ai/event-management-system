
const express = require('express') ;
const { getEvents , createEvent } = require('../controllers/event.controller.js');
const upload = require('../middleware/upload.js')
const router  = express.Router() ;
 
 
router.get('/events'  ,getEvents) ;
router.post('/events',upload.single('bannerUrl') ,createEvent);


module.exports = router ;
 