var host = "http://localhost:8002";



$(document).ready(function(){
    loadDanhSachPhone();
})

// -----------------------------Tạo giao diện
function Tao_The_hien_Mobile(){

}

// -----------------------------Xử lý nghiệp vụ


// -----------------------------Thực hiện đọc/ghi dữ liệu
function loadDanhSachPhone(){
    var Xu_ly_HTTP = new XMLHttpRequest();
    var linkRequest = host + "/getAllMobileForHome";
    Xu_ly_HTTP.onreadystatechange = function(){
        if(this.readyState == 4 && this.status  == 200){
            var objData = JSON.parse(this.responseText);
            console.log(objData);
        }
    };
    Xu_ly_HTTP.open("GET", linkRequest, true);
    Xu_ly_HTTP.send();
}