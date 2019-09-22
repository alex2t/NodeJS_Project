// file that contain the code to communictae with the server

module.exports = function(io){
     
    io.on('connection', (socket) => {
        socket.on('join PM', (pm) => {
            socket.join(pm.room1);
            socket.join(pm.room2);
            
        });
       
        
        socket.on('private message', (message,callback) => {
            io.to(message.room).emit('new message', {
                text: message.text,
                sender: message.sender
                //room  ot needed in the client side
            });
            
            io.emit('message display', {});
            
            // callback();
            // console.log(message);
        });
        
        socket.on('refresh', function(){
            io.emit('new refresh', {});
        });
        
    });
}