
const{Users}= require('../models/UsersClass');


module.exports = function(io, Users){
    
const users = new Users();

    io.on("connection", (socket)=> {
        // console.log('user connected');

        socket.on('join', (params, callback)=> {
            socket.join(params.room); // connect user to channel

            // the parameter from the client scoket
            //The user is added to the arrays user form the User Class in
            // order to implement the list of the user available in a room
            users.AddUser(socket.id, params.name, params.room);
           
            

            //It is then broadcast to all users of that room
            io.to(params.room).emit('roomList', users.GetList(params.room));
            callback();

        });

        
        // In order to sent the message to all the users we pass inside 
        socket.on('createMessage', (message, callback)=>{
            // console.log(message);
            io.to(message.room).emit('newMessage', {
                text: message.text,
                room: message.room,
                from: message.from
            });

            callback(); // to clear textbox
        });

        // socket event to detect whenever a user disconnect from a room
        
        socket.on('disconnect', () => {
            // when a user refresh or disconnect id will be removed
            let user = users.RemoveUser(socket.id);
            
            // let other users know that this user has been disconnected
            if(user){
                io.to(user.room).emit('roomList', users.GetList(user.room));
            }
        })
    });

    
}