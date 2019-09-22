$(document).ready(function(){
    var socket = io();
    
    var value1 = window.location.pathname;  //url as chat/Alex.Joe
        var value2 = value1.split('/'); // ["", "chat","Alex.Joe"]
        var value3 = value2.pop();      // Alex.joe
   
        // console.log(" value3" + value3);
    var newParam = value3.split('.');  // [ 'Alex', 'joe' ]
    
    
    // var username = newParam[0];    // Alex
    // $('#receiver_name').text('@'+username);

    function swap(input, value_1, value_2){
        var temp = input[value_1];
        input[value_1] = input[value_2];
        input[value_2] = temp;
        return input;
    }
    
    swap(newParam, 0, 1);    // [ 'joe', 'Alex' ]
    
    var paramTwo = newParam[0]+'.'+newParam[1]; // joe.Alex
    console.log(value3);
    console.log(paramTwo);
    socket.on('connect', function(){
        var params = {
           room1: value3,                       //Alex.joe
           room2: paramTwo                      //joe.Alex
        } 
       
        socket.emit('join PM', params, );
        
        
    });
    
    socket.on('new message', function(data){
        var template = $('#message-template').html();
        var message = Mustache.render(template, {
            text: data.text,
            sender: data.sender
        });
        
        $('#messages').append(message);
    });
    
    $('#message_form').on('submit', function(e){
        e.preventDefault();
        
        var msg = $('#msg').val();
        var sender = $('#name-user').val();
        
        if(msg.trim().length > 0){ // to make sure message is not empty
            socket.emit('private message', {
                text: msg,
                sender: sender,
                room: value3
            }, function(){// to clear input field
                $('#msg').val('');
            }
            );
        }
    });
    
    
});





























