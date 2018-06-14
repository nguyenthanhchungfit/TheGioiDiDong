'use strict'

const length_key = 10;

class SessionsManager{
    
    constructor(size){
        if(!size){
            this.size = 0;
        }else{
            this.size = size;
        }
        this.connections = [];
    }

    isExistedKey(key){
        var length = this.connections.length;
        for(var i =0; i <length; i++){
            if(key === this.connections[i]){
                return true;
            }
        }
        return false;
    }

    createSessionKey(size){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < size; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    insertNewConnection(){
        if(this.connections.length === this.size){
            return -1;
        }
        var i = 0;
        while(true){
            i++;
            if(i == 100){
                return -1;
            }
            var key = this.createSessionKey(length_key);
            if(this.isExistedKey(key) == false){
                this.connections.push(key);
                return key;
            }
        }
    }

    printConnections(){   
        this.connections.forEach(function(value){
            console.log(value);
        });
    }
}

module.exports = SessionsManager;