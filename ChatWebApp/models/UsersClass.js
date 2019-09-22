class Users {
    constructor(){
        this.users = [];
    }
    
    AddUser(id, name, room){
        var users = {id, name, room};
        this.users.push(users);
        return users;
    }
    
    

    // return all id  execpt the one that is passed inside the function
    RemoveUser(id){
        var user = this.GetUser(id);
        if(user){
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }
    
    // return all id of user connected to that socket
    // filter use every id equal to the one pass in the function will be returned
    // for each user return one array
    GetUser(id){
        var getUser = this.users.filter((userId) => {
            return userId.id === id;
        })[0];
        return getUser;
    }
    
    GetList(room){
        //map through the array to look all the name
        var users = this.users.filter((user) => user.room === room);
        
        var namesArray = users.map((user) => {
            return user.name;
        });
        
        return namesArray;
    }
}

module.exports = {Users};