

$(document).ready(function(){
    var socket = io();

    //gonna make use of groupName and sendername line 111 group ejs input hiden
    
    var room = $('#groupName').val();
    var sender = $('#sender').val();
    
    socket.on('connect', function(){
        var params = {
            sender: sender
        }
        
       
        socket.emit('joinRequest', params, function(){
            // console.log('Joined');
            // console.log("room" + room);
        });
    });
    // once user click add friend when form submited send data
    $( "#add_friend" ).submit(function( event ){
        event.preventDefault(); //prevent the form from reloading
        console.log("it s cliqued");
         
        // receiverNamae is passe from roomList event groupchat client it set on the sender of the request
         var receiverName = $('#receiverName').val();
         
         $.ajax({
             url: '/group/'+room,
             type: 'POST',
             data: {
                 receiverName: receiverName  // receiverName as per groupchat.js
             },
             success: function(){//  for the receiver to receive notification in real time
                 socket.emit('friendRequest', {
                     receiver: receiverName,
                     sender: sender
                 }, function(){
                     console.log('Request Sent');
                 })
             }
         })
     });
    
    socket.on('newFriendRequest', function(friend){
        // jquery method to do not have the user to refresh the page if friend reuqest is not accepted
        $('#reload').load(location.href + ' #reload'); //load the div from the server once it receive the notification
   // event delegation
        $(document).on('click', '#accept_friend', function(){ // without document user will have to refresh the page before accepting the request
            //from the file /includes/signedIN/navSignin.ejs
            var senderId = $('#senderId').val(); // from nav bar on the receiver it s sender user_id
            var senderName = $('#senderName').val();  // it email of the sender on the nav bar of the receiver
            var friendName = $('#friendName').val()  // name of the sender
            

            $.ajax({
                url: '/group/'+room,
                type: 'POST',
                data: {
                    senderId: senderId,
                    senderName: senderName,
                    friendName: friendName
                },
                success: function(){
                    $(this).parent().eq(1).remove();
                }
            });
            $('#reload').load(location.href + ' #reload');
        });
        
        $(document).on('click', '#cancel_friend', function(){
            var user_Id = $('#user_Id').val(); // from nav bar on the receiver of the request
                                                // user_id of the sender

            $.ajax({
                url: '/group/'+room,
                type: 'POST',
                data: {
                    user_Id: user_Id
                },
                success: function(){
                    $(this).parent().eq(1).remove();
                }
            });
            $('#reload').load(location.href + ' #reload');
        });
    });
    
    
    
    $('#accept_friend').on('click', function(){
        //from the file /includes/signedIN/navSignin.ejs
        var senderId = $('#senderId').val();  // r
        var senderName = $('#senderName').val();
        console.log("it s cliqued2");
        
        $.ajax({
            url: '/group/'+room,
            type: 'POST',
            data: {
                senderId: senderId,
                senderName: senderName
            },
            success: function(){
                $(this).parent().eq(1).remove();  //this currently selected element remove + his parent
            }
        });
        $('#reload').load(location.href + ' #reload'); //update the notification by removing the invitation  
    });
    
    $('#cancel_friend').on('click', function(){
        console.log("cancel is clicke")
        var user_Id = $('#user_Id').val();
        
        $.ajax({
            url: '/group/'+room,
            type: 'POST',
            data: {
                user_Id: user_Id
            },
            success: function(){
                $(this).parent().eq(1).remove();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("some error");
                console.log(errorThrown);
             }
        });
        $('#reload').load(location.href + ' #reload');
    });
});

















