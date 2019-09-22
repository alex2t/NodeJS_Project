class Global {
    constructor(){
        this.globalRoom = [];
    }
    
    EnterRoom(id, name, room){
        var roomName = {id, name, room};
        this.globalRoom.push(roomName);
        return roomName;
    }
    
    
    
    GetRoomList(room){
        //filer through the global room array
        var roomName = this.globalRoom.filter((user) => user.room === room);
        
        var namesArray = roomName.map((user) => {
            return {
                name: user.name
            }
        });
        
        return namesArray;
    }

    RemoveUser(id){
        var user = this.GetUser(id);
        if(user){
            this.users = this.globalRoom.filter((user) => user.id !== id);
        }
        return user;
    }
    
    GetUser(id){
        var getUser = this.globalRoom.filter((userId) => {
            return userId.id === id;
        })[0];
        return getUser;
    }

}
module.exports = {Global};