// event will be emited a suser logged

module.exports = function(io, Global, _){
    const clients = new Global();
    
    // need to listen for the global connection made available through socket .io
    io.on('connection', (socket) => {
        socket.on('global room', (global) => {
            socket.join(global.room);
            
            clients.EnterRoom(socket.id, global.name, global.room);
            
            const nameProp = clients.GetRoomList(global.room);// retunr an array

            // console.log(nameProp);

         // duplicate will be created if page is refresh 
         // solution use 
         function getUnique(arr, comp) {

            const unique = arr
                 .map(e => e[comp])
          
               // store the keys of the unique objects
              .map((e, i, final) => final.indexOf(e) === i && i)
          
              // eliminate the dead keys & store unique objects
              .filter(e => arr[e]).map(e => arr[e]);
          
             return unique;
          }
          const arr= getUnique(nameProp,'name');
        //   console.log("in global server side for loggedInUser");
        //   console.log(arr);
            
            io.to(global.room).emit('loggedInUser', arr);
        });

        socket.on('disconnect', () => {
            const user = clients.RemoveUser(socket.id);
            
            
            
            if(user){
                var userData = clients.GetRoomList(user.room);
                // console.log("userData");
                // console.log(userData);
                const arr = userData.filter(function( userData ) {
                    return userData.name !== user.name;
                });
                // console.log(user.room);
                // console.log("in disconnect" + arr);
                io.to(user.room).emit('loggedInUser', arr);
            }
        })
        
        
       
    });
}