module.exports = function(io){
    io.on('connection', (socket) => { // detect if user is connected to received message or friend request
        
        //The Joinrequest purpose is to ensure that the person that is going
        // to receive the request is connected to the room
        socket.on('joinRequest', (myRequest, callback) => {
           socket.join(myRequest.sender);
           
           callback();// so acknowledgement can be display
        }); 
        
        socket.on('friendRequest', (friend, callback) => { // newFriendReuqets realtime notification
            io.to(friend.receiver).emit('newFriendRequest', {  // receiver from  group/sendRequest
               from: friend.sender,  //test
               to: friend.receiver
            }); 
            
            callback(); //display ack in console
        });
    });
}