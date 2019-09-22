const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
    
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  
//  update for the sender object contain username of  receiver of the friend request
// Receiver will not be updated sentRequest.email
  sentRequest: [{ 
    email: {
      type: String, default: ''
    }
}],
//contain username and  id from sender
request: [{ 
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    email: {type: String, default: ''},
    friendName: {type: String, default: ''}
}],
friendsList: [{
    friendId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    friendMail: {type: String, default: ''},
    friendName: {type: String, default: ''}
}],
totalRequest: {type: Number, default: 0},
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
