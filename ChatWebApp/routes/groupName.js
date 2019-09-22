const express = require('express');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const async = require('async');
const Users = require('../models/User');


const router=express.Router();
// var i=0;
router.get('/group/:name', ensureAuthenticated, (req, res)=>{  
    const name = req.params.name;
    // get the data from the user that send the  request
    async.parallel([
      function(callback){
          Users.findOne({'email': req.user.email}) // return the complete object
              .populate('request.userId') // the object request.userId is populate with req.user
              
              .exec((err, result) => {
                  callback(err, result);
              })
      },
      
      
  ], (err, results) => {
      const result1 = results[0]; // async return an array 
       res.render('groupchat/group',{title: 'webchat',user:req.user, groupName:name, data:result1});   
      
  });
    
   });

router.post('/group/:name',ensureAuthenticated, (req, res)=>{ 
  async.parallel([ // to send friend request Request Sent && Request 
    function(callback){ // update collection of the receiver
        if(req.body.receiverName){
            Users.updateOne({ // update the collection of the receiver
              'email': req.body.receiverName , 
              'friendsList.friendId':{$ne: req.user._id} 
            },
            {// userID of the sender
              $push: {request: { 
                userId: req.user._id,
                email: req.user.email,
                friendName: req.user.name
              }},
              $inc:{totalRequest: 1}

            }, (err,count)=>{
              callback(err,count);
            })          
        }
    },

    //update collection of the sender
    function(callback){ 
     //if receiverName exist
      if(req.body.receiverName){ 
        Users.updateOne({ 
          'email': req.user.email,
          'sentRequest.email':{$ne: req.body.receiverName} 
        },{
          $push:{sentRequest: {
              email: req.body.receiverName
          }}
        },(err,count)=>{
          callback(err,count);
        })
        // return;
      }
      // callback(new Error('Receiver name missing'));
    }

],(err,results)=>{
    if (err) {
    //  res.sendStatus(400);
     console.log(err);
    }
    else{
    res.redirect('/group/'+req.params.name);
    console.log("success");
    }
  });
// to  or acept a friend
  async.parallel([
    //on accept the friend request this will update for the receiver of the request
    function(callback){
      if(req.body.senderId){ 
        
        Users.updateOne({
            '_id': req.user._id, 
            'friendList.friendId': {$ne: req.body.senderId} 
        },{
          $push:{friendsList:{
            friendId: req.body.senderId,
            friendMail: req.body.senderName,
            friendName: req.body.friendName
          }}, //then empty the request object array
          $pull: {request:{
            userId: req.body.senderId,
            email:  req.body.senderName,
            name: req.body.friendName
          }},
          $inc: {totalRequest: -1}
        }, (err,count)=>{
          callback (err, count);
        });
        // return;                      
      } 
      // callback(new Error('senderId missing'));
    },
    // update  the sender of the friend request when it s accepted
    function(callback){
      if(req.body.senderId){
        console.log("name"+ req.user.name);
        Users.updateOne({
            '_id': req.body.senderId, 
            'friendList.friendId': {$ne: req.user._id} 
        },{
          $push:{friendsList:{
            friendId: req.user._id,
            friendMail: req.user.email,
            friendName : req.user.name
          }}, 
          $pull: {sentRequest:{
            email:  req.user.email
          }},
        }, (err,count)=>{
          callback (err, count);
        });                      
      } 
    },
    function(callback){
      if(req.body.user_Id){ // id of the input field on the navbar ID of the sender of the friendrequest
        Users.updateOne({
            '_id': req.user._id, 
            'request.userId': {$eq: req.body.user_Id } 
        },{
          $pull: {request:{
            userId: req.body.user_Id
          }},
          $inc: {totalRequest: -1}
        }, (err,count)=>{
          callback (err, count);
        });                      
      } 
    }, // cancel request from the sender
    function(callback){
      if(req.body.user_Id){ // id of the input field user_Id:
        Users.updateOne({
            '_id': req.body.user_Id, 
            'sentRequest.email': {$eq: req.user.email } 
        },{
          $pull: {sentRequest:{
            email: req.user.email
          }}
          
        }, (err,count)=>{
          callback (err, count);
        });                      
      } 
    }
    
    
  ],(err, results)=> {
    if (err) {
      // res.sendStatus(400);
      console.log(err);
     }
     else{
     res.redirect('/group/'+req.params.name);
     console.log("success");
     }
  });
  

});   

exports.routes = router;