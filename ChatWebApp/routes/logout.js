const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


router.get('/logout', ensureAuthenticated, (req, res) =>

req.session.destroy((err) => {
    res.redirect('/');
 }),
  
);

module.exports = router;
