const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const async = require('async');
const Users = require('../models/User');


router.get('/', ensureAuthenticated, (req, res) =>

async.parallel([
    function(callback){
        Users.findOne({'email': req.user.email})
            .populate('request.userId') // if the user already have friendrequest
            
            .exec((err, result) => {
                callback(err, result);
            })
    },
    
    
], (err, results) => {
    const result1 = results[0];

     res.render('private/private',{title: 'football- Group',user:req.user,  data:result1});
    
})


  
);

module.exports = router;
