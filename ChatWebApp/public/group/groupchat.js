

$(document).ready(function(){
    var socket = io();

    let room= $('#groupName').val();
    let sender=$('#sender').val();

    socket.on('connect', function(){ //to listen for event
        
        // when ever user joined  will get the neame of the user and the name of the room
        let params={
            room: room,
            name:sender
        }
        //to listen when a user is connected to a room 
        socket.emit('join', params, function(){
        });

    });

    socket.on('roomList', (users)=>{
        let list = $('<ol></ol>');
        for(let x =0; x<users.length; x++){
            list.append('<p><a id="val" data-toggle="modal" data-target="#myModal">'+users[x]+'</p></a>');
        }
        // select val from above When a user clicked on rooms user to send invitation request
        $(document).on('click', '#val', function(){
            // passed the name of the user clicked to the modal
            $('#name').text('@ '+$(this).text()); // get the text from currently click element and insert into name in Modal user[x]
            $('#receiverName').val($(this).text());// pass this value to the input field of the sender of the request
            // .val for input field
        });
        // the div with id user will display the list of online users
        $('#users').html(list);
           
    });

    socket.on('newMessage', function(data){
        var template = $('#message-template').html();
        var message = Mustache.render(template, {
            text: data.text,
            sender: data.from
            
        });
        $('#messages').append(message); //method inserts the specified content as the last child of each element
        
    });
//It will send the message to the room through  the emit
// function of event name  createMessage

    $('#message-form').on('submit', function(e){
        e.preventDefault();   // avoid to reload

        var msg=$('#msg').val();
        socket.emit('createMessage', {
            text: msg,
            room: room,
            from: sender
        }, function(){ // to clear message box after sending a message
            $('#msg').val('');
        });
    });

});