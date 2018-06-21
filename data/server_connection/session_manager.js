'use strict'
const fs = require("fs");
var const_path_data = __dirname + "/session_storage.json";

const length_key = 10;

class SessionsManager{
    
    constructor(size){
        if(!size){
            this.size = 0;
        }else{
            this.size = size;
        }
        this.timeout = 1000000;
        this.connections = [];
    }

    // Nếu tồn tại key trả về index của session
    isExistedKey(key){
        var length = this.connections.length;
        for(var i =0; i <length; i++){
            if(key === this.connections[i]){
                return i;
            }
        }
        return -1;
    }

    // Kiểm tra session còn thời hạn không? Nếu không return true, ngược lại false
    isExpiredDate(last_access, a_timeout){
        var milis = new Date(last_access).getTime();
        var milisNow = new Date().getTime();
        return (milis + a_timeout) < milisNow;
    }

    // Tạo một key sessionID random
    createSessionKey(size){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < size; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    // Tạo một session mới, đồng thời cập nhật dữ liệu xuống file
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
            if(this.isExistedKey(key) < 0){
                var new_session = {"sessionID" : key, "time_out" : this.timeout, "last_access" : new Date()}
                this.connections.push(new_session);
                this.saveDataToFile();
                return key;
            }
        }
    }

    // In ra các session đang quản lý
    printConnections(){   
        this.connections.forEach(function(value){
            console.log(value);
        });
    }

    // Lưu các connections hiện tại xuống dưới file
    saveDataToFile(){
        fs.writeFileSync(const_path_data, JSON.stringify(this.connections), "utf8");
    }

    // Cập nhật các connections từ file
    loadDataFromFile(){
        var session_data = JSON.parse(fs.readFileSync(const_path_data, 'utf8'));
        this.connections = [];
        var length = session_data.length;
        for(var i = 0; i < length; i++){
            var session = session_data[i];
            if(!this.isExpiredDate(session.last_access, session.time_out)){
                this.connections.push(session);
            }
        }
    }

    // Set timeout cho session_manager
    setTimeout(a_timeout){
        this.timeout = a_timeout;
    }

    // Trả về thời gian timeout hiện tại của session_manager
    getTimeout(){
        return this.timeout;
    }

    // Cập nhật thời gian truy cập mới nhất cho session, thành công thì trả true, cập nhật file.
    // Ngược lại return false.
    updateSessionLastAccessDate(sessionID, new_access_date){
        var newDate = new Date(new_access_date);
        if(newDate == undefined) return false;
        var length = this.connections.length;
        for(var i =0; i<length; i++){
            var session = this.connections[i];
            if(sessionID == session.sessionID){
                if(!this.isExpiredDate(session.last_access, session.time_out)){
                    session.last_access = new_access_date;
                    this.saveDataToFile();
                    return true;
                }
            }
        }
        return false;
    }

    // Xoá session tại vị trí index
    removeSession(index){
        if(index < 0 || index > this.connections.length) return false;
        this.connections.splice(index, 1);
        this.writeFileSync();
        return true;
    }
}

module.exports = SessionsManager;