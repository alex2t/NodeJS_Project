$(document).ready(function(){

    var socket = io();
    // connect event made availiable from socket.io
    
    socket.on('connect', function(){
        
        var room = 'GlobalRoom';
        var name = $('#name-user').val();
        
        
        socket.emit('global room', {
            room: room,
            name: name
        });
        
        socket.on('message display', function(){
            $('#reload').load(location.href + ' #reload');
        });
    });
    
    socket.on('loggedInUser', function(users){
        
        var friends = $('.friend').text(); // get all friend from the c
        // console.log("friends3");
        // console.log(friends);
        var friend = friends.split('@');

       
        
        var name = $('#name-user').val(); // from group.ejs file
        var ol = $('<div></div>');
        var arr = [];// if friend exist push them inot forloops
        // for (i=0; i<arr.length;i++){
        // console.log(" users"+  users);
        // }
        for(var i = 0; i < users.length; i++){
            //console.log(users[i]);
            
            if(friend.indexOf(users[i].name) > -1){ // if the name exits it that particular array -1 => false
                arr.push(users[i]);
                var userName= users[i].name;
                var list = '<a id="val" href="/chat/'+userName+'.'+name+'"><h3">'+'@'+users[i].name+' </h3><br>'
                ol.append(list);
               // ol.append(users[i].name);
                
            }
        }
        
        $('#numOfFriends').text('('+arr.length+')');
        $('.onlineFriends').html(ol);
    });
});












