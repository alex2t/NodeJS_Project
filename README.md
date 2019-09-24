# WebChat application
The application created in this project ChatWebapp  offer the possibility to users to chat in a room depending of the premier league football teams of choice.20 different room is available, one for each premier league team. 
It offer as well a private one to one room for communication between two users
Once connected to a room a user is able to chat among the room participant. The list of the other participant is display to him on the side bar by showing their email address. By clicking on one of them,   a friend request invitation will be sent to that user . 
The recipient of the invitation could either accept or deny it.

All accepted invitation does not require any further invite to participate in a one to communication, as the friend will be stored to that database for that user

The list of friends to a user that are online for a private chat are  display to the user as he entered a group room beside the display of the room particpant

Socket.io is used to-
-	listen all the user that are connected to the application
-	Display messaged in the group room
-	Display the List of user in a room that are online in real time
-	Sent the invitation to the recipient of the friend request invitation in real time
-	Private message between user
-	Display the online friend of the user in real time

Mustache.js is used to display the message to the user in real time. While jQuery is used to display to the receiver that a friend request has been sent to him. 

Email and encrypted user password are stored in mongo DB database

