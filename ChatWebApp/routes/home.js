const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');



router.get('/home', ensureAuthenticated, (req, res) =>

  res.render('./home/home', {
    user: req.user,
    user_id: req.sessionID
  }),
  
);

router.post('/home',  (req,res)=>{
  res.render('home');
})

module.exports = router;
