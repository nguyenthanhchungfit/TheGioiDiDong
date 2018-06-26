var host = "http://localhost:8002";

$(document).ready(function(){
    loginUser('thanhchung', 'NTCntc');
    //loadDanhSachLaptop();
})

$("#mobile_button").on('click', function(e){
    e.preventDefault();
    loadDanhSachPhone();
});

$("#laptop_button").on('click', function(e){
    e.preventDefault();
    loadDanhSachLaptop();
});

$("#tablet_button").on('click', function(e){
    e.preventDefault();
    loadDanhSachTablet();
});

// -----------------------------Tạo giao diện
function Tao_The_hien_Mobile(objData){
    if(objData){
        var typeUser = localStorage.getItem("type");
        if(typeUser == undefined){
            typeUser = 0;
        }

        var length = objData.length;
        var container = document.createElement("div");
        container.className = "container";
        var row = document.createElement("div");
        row.className = "row";
        var title = document.createElement("h1");
        title.innerText = "Mobile";
        row.appendChild(title);

        container.appendChild(row);

        for(var i = 0; i < length; i++){
            var rowItem
            if(i % 6 == 0){
                rowItem = document.createElement("div");
                rowItem.className = "row";
            }
            var phone = objData[i];
            var ma_dien_thoai = phone.ma_dien_thoai;
            var ten_dien_thoai = phone.ten_dien_thoai;
            var gia = phone.gia;
            var ma_hinh = phone.ma_hinh;
            
            // 1.Tạo div Product
            var divProduct = document.createElement("div");
            divProduct.classList = "col-md-2 product product-single";
            divProduct.id = ma_dien_thoai;

            // 1.1 Tạo div hình
            var divProductImg = document.createElement("div");
            divProductImg.className = "product-thumb";

            var aProductImg = document.createElement("a");
            aProductImg.href = "/phone?id=" + ma_dien_thoai;

            var imgProductImg = document.createElement("img");
            imgProductImg.className = "img_thubnail_home";     
            imgProductImg.src = "./img/mobile/" + ma_hinh;

            aProductImg.appendChild(imgProductImg);
            divProductImg.appendChild(aProductImg);
            divProduct.appendChild(divProductImg);

            // 1.2 Tạo div body 
            var divProductBody = document.createElement("div");
            divProductBody.className = "product-body";
            // 1.2.1 Tạo div body giá
            var h3ProductPrice = document.createElement("h3");
            h3ProductPrice.className = "product-price";
            h3ProductPrice.innerText = gia;
            divProductBody.appendChild(h3ProductPrice);

            // 1.2.2 Tạo div body name
            var h2ProductName = document.createElement("h2");
            h2ProductName.className = "product-name";
            var aProductName = document.createElement("a");
            aProductName.href = "/phone?id=" + ma_dien_thoai;
            aProductName.innerText = ten_dien_thoai;
            h2ProductName.appendChild(aProductName);
            divProductBody.appendChild(h2ProductName);


            // 1.2.3 Tạo button add to cart
            if(typeUser == 2){
                var divProductButton = document.createElement("div");
                divProductButton.className = "product-btns";
                var buttonProductButton = document.createElement("button");
                buttonProductButton.classList = "primary-btn add-to-cart";
                var iProductButton = document.createElement("i");
                iProductButton.classList = "fa fa-shopping-cart";
                buttonProductButton.appendChild(iProductButton);
                buttonProductButton.innerText = "Add to Cart";
                divProductButton.appendChild(buttonProductButton);
                divProductBody.appendChild(divProductButton);
            }

            divProduct.appendChild(divProductImg);
            divProduct.appendChild(divProductBody);
            
            rowItem.appendChild(divProduct);
            if((i == length - 1) || ((i % 6) == 5)){
                container.appendChild(rowItem);
            }     
        }

        return container;
    }
}

function Tao_The_hien_Laptop(objData){
    if(objData){
        var typeUser = localStorage.getItem("type");
        if(typeUser == undefined){
            typeUser = 0;
        }

        var length = objData.length;
        var container = document.createElement("div");
        container.className = "container";
        var row = document.createElement("div");
        row.className = "row";
        var title = document.createElement("h1");
        title.innerText = "Laptop";
        row.appendChild(title);

        container.appendChild(row);

        for(var i = 0; i < length; i++){
            var rowItem
            if(i % 6 == 0){
                rowItem = document.createElement("div");
                rowItem.className = "row";
            }
            var laptop = objData[i];
            var ma_laptop = laptop.ma_laptop;
            var ten_laptop = laptop.ten_laptop;
            var gia = laptop.gia;
            var ma_hinh = laptop.ma_hinh;
            
            // 1.Tạo div Product
            var divProduct = document.createElement("div");
            divProduct.classList = "col-md-2 product product-single";
            divProduct.id = ma_laptop;

            // 1.1 Tạo div hình
            var divProductImg = document.createElement("div");
            divProductImg.className = "product-thumb";

            var aProductImg = document.createElement("a");
            aProductImg.href = "/laptop?id=" + ma_laptop;

            var imgProductImg = document.createElement("img");
            imgProductImg.className = "img_thubnail_home";     
            imgProductImg.src = "./img/laptop/" + ma_hinh;

            aProductImg.appendChild(imgProductImg);
            divProductImg.appendChild(aProductImg);
            divProduct.appendChild(divProductImg);

            // 1.2 Tạo div body 
            var divProductBody = document.createElement("div");
            divProductBody.className = "product-body";
            // 1.2.1 Tạo div body giá
            var h3ProductPrice = document.createElement("h3");
            h3ProductPrice.className = "product-price";
            h3ProductPrice.innerText = gia;
            divProductBody.appendChild(h3ProductPrice);

            // 1.2.2 Tạo div body name
            var h2ProductName = document.createElement("h2");
            h2ProductName.className = "product-name";
            var aProductName = document.createElement("a");
            aProductName.href = "/phone?id=" + ma_laptop;
            aProductName.innerText = ten_laptop;
            h2ProductName.appendChild(aProductName);
            divProductBody.appendChild(h2ProductName);


            // 1.2.3 Tạo button add to cart
            if(typeUser == 2){
                var divProductButton = document.createElement("div");
                divProductButton.className = "product-btns";
                var buttonProductButton = document.createElement("button");
                buttonProductButton.classList = "primary-btn add-to-cart";
                var iProductButton = document.createElement("i");
                iProductButton.classList = "fa fa-shopping-cart";
                buttonProductButton.appendChild(iProductButton);
                buttonProductButton.innerText = "Add to Cart";
                divProductButton.appendChild(buttonProductButton);
                divProductBody.appendChild(divProductButton);
            }

            divProduct.appendChild(divProductImg);
            divProduct.appendChild(divProductBody);
            
            rowItem.appendChild(divProduct);
            if((i == length - 1) || ((i % 6) == 5)){
                container.appendChild(rowItem);
            }     
        }

        return container;
    }
}

function Tao_The_hien_Tablet(objData){
    if(objData){
        var typeUser = localStorage.getItem("type");
        if(typeUser == undefined){
            typeUser = 0;
        }

        var length = objData.length;
        var container = document.createElement("div");
        container.className = "container";
        var row = document.createElement("div");
        row.className = "row";
        var title = document.createElement("h1");
        title.innerText = "Tablet";
        row.appendChild(title);

        container.appendChild(row);

        for(var i = 0; i < length; i++){
            var rowItem
            if(i % 6 == 0){
                rowItem = document.createElement("div");
                rowItem.className = "row";
            }
            var tablet = objData[i];
            var ma_tablet = tablet.ma_tablet;
            var ten_tablet = tablet.ten_tablet;
            var gia = tablet.gia;
            var ma_hinh = tablet.ma_hinh;
            
            // 1.Tạo div Product
            var divProduct = document.createElement("div");
            divProduct.classList = "col-md-2 product product-single";
            divProduct.id = ma_tablet;

            // 1.1 Tạo div hình
            var divProductImg = document.createElement("div");
            divProductImg.className = "product-thumb";

            var aProductImg = document.createElement("a");
            aProductImg.href = "/phone?id=" + ma_tablet;

            var imgProductImg = document.createElement("img");
            imgProductImg.className = "img_thubnail_home";     
            imgProductImg.src = "./img/tablet/" + ma_hinh;

            aProductImg.appendChild(imgProductImg);
            divProductImg.appendChild(aProductImg);
            divProduct.appendChild(divProductImg);

            // 1.2 Tạo div body 
            var divProductBody = document.createElement("div");
            divProductBody.className = "product-body";
            // 1.2.1 Tạo div body giá
            var h3ProductPrice = document.createElement("h3");
            h3ProductPrice.className = "product-price";
            h3ProductPrice.innerText = gia;
            divProductBody.appendChild(h3ProductPrice);

            // 1.2.2 Tạo div body name
            var h2ProductName = document.createElement("h2");
            h2ProductName.className = "product-name";
            var aProductName = document.createElement("a");
            aProductName.href = "/phone?id=" + ma_tablet;
            aProductName.innerText = ten_tablet;
            h2ProductName.appendChild(aProductName);
            divProductBody.appendChild(h2ProductName);


            // 1.2.3 Tạo button add to cart
            if(typeUser == 2){
                var divProductButton = document.createElement("div");
                divProductButton.className = "product-btns";
                var buttonProductButton = document.createElement("button");
                buttonProductButton.classList = "primary-btn add-to-cart";
                var iProductButton = document.createElement("i");
                iProductButton.classList = "fa fa-shopping-cart";
                buttonProductButton.appendChild(iProductButton);
                buttonProductButton.innerText = "Add to Cart";
                divProductButton.appendChild(buttonProductButton);
                divProductBody.appendChild(divProductButton);
            }

            divProduct.appendChild(divProductImg);
            divProduct.appendChild(divProductBody);
            
            rowItem.appendChild(divProduct);
            if((i == length - 1) || ((i % 6) == 5)){
                container.appendChild(rowItem);
            }     
        }

        return container;
    }
}


// -----------------------------Xử lý nghiệp vụ


// -----------------------------Thực hiện đọc/ghi dữ liệu
function loadDanhSachPhone(){
    var currentSession = localStorage.getItem("sessionID");
    if(currentSession == undefined){
        currentSession = -1;
    }
    var Xu_ly_HTTP = new XMLHttpRequest();
    var linkRequest = host + "/getAllMobileForHome";
    Xu_ly_HTTP.onreadystatechange = function(){
        if(this.readyState == 4 && this.status  == 200){
            var objData = JSON.parse(this.responseText);
            console.log(objData);
            if(objData.error){
                $("#danh_sach_sp").html("No Data Tranfser");
            }else{
                var htmlMobile = Tao_The_hien_Mobile(objData);
                $("#danh_sach_sp").html(htmlMobile);
            }
            
        }
    };
    Xu_ly_HTTP.open("GET", linkRequest, true);
    Xu_ly_HTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    Xu_ly_HTTP.setRequestHeader("session_user", currentSession);
    Xu_ly_HTTP.send();
}

function loadDanhSachLaptop(){
    var currentSession = localStorage.getItem("sessionID");
    if(currentSession == undefined){
        currentSession = -1;
    }

    var Xu_ly_HTTP = new XMLHttpRequest();
    var linkRequest = host + "/getAllLaptopForHome";
    Xu_ly_HTTP.onreadystatechange = function(){
        if(this.readyState == 4 && this.status  == 200){
            var objData = JSON.parse(this.responseText);
            console.log(objData);
            if(objData.error){
                $("#danh_sach_sp").html("No Data Tranfser");
            }else{  
                var htmlLaptop = Tao_The_hien_Laptop(objData);
                $("#danh_sach_sp").html(htmlLaptop);
            }
            
        }
    };
    Xu_ly_HTTP.open("GET", linkRequest, true);
    Xu_ly_HTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    Xu_ly_HTTP.setRequestHeader("session_user", currentSession);
    Xu_ly_HTTP.send();
}

function loadDanhSachTablet(){
    var currentSession = localStorage.getItem("sessionID");
    if(currentSession == undefined){
        currentSession = -1;
    }

    var Xu_ly_HTTP = new XMLHttpRequest();
    var linkRequest = host + "/getAllTabletForHome";
    Xu_ly_HTTP.onreadystatechange = function(){
        if(this.readyState == 4 && this.status  == 200){
            var objData = JSON.parse(this.responseText);
            console.log(objData);
            if(objData.error){
                $("#danh_sach_sp").html("No Data Tranfser");
            }else{  
                var htmlTablet = Tao_The_hien_Tablet(objData);
                $("#danh_sach_sp").html(htmlTablet);
            }
            
        }
    };
    Xu_ly_HTTP.open("GET", linkRequest, true);
    Xu_ly_HTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    Xu_ly_HTTP.setRequestHeader("session_user", currentSession);
    Xu_ly_HTTP.send();
}

// Connection

function loginUser(username, password){

    var account = `username=${username}&password=${password}`;
    //var account = {username : username, password : password};

    var currentSession = localStorage.getItem("sessionID");
    if(currentSession == undefined){
        currentSession = -1;
    }
    var Xu_ly_HTTP = new XMLHttpRequest();
    var linkRequest = host + "/loginUser";
    Xu_ly_HTTP.onreadystatechange = function(){
        if(this.readyState == 4 && this.status  == 200){
            var objData = JSON.parse(this.responseText);
            console.log(objData);
            // if (typeof(Storage) !== "undefined") {
            //     localStorage.setItem("sessionID", objData.sessionID);
            //     localStorage.setItem("type", objData.type);
            // } else {
            //     alert('Sorry! No Web Storage support..');
            // }
        }
    };
    Xu_ly_HTTP.open("POST", linkRequest, true);
    //Xu_ly_HTTP.setRequestHeader("Content-type", "application/json");
    Xu_ly_HTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    Xu_ly_HTTP.setRequestHeader("session_user", currentSession);
    Xu_ly_HTTP.send(account);
}

function updateConnectionToServer(){
    var currentSession = localStorage.getItem("sessionID");
    if(currentSession == undefined){
        currentSession = -1;
        localStorage.setItem("type", objData.type);
    }else{
        var Xu_ly_HTTP = new XMLHttpRequest();
        var linkRequest = host + "/getConnection";
        Xu_ly_HTTP.onreadystatechange = function(){
            if(this.readyState == 4 && this.status  == 200){
                var objData = JSON.parse(this.responseText);
                if (typeof(Storage) !== "undefined") {
                    localStorage.setItem("sessionID", objData.sessionID);
                    localStorage.setItem("type", objData.type);
                } else {
                    alert('Sorry! No Web Storage support..');
                }
            }
        };
        Xu_ly_HTTP.open("GET", linkRequest, true);
        Xu_ly_HTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        Xu_ly_HTTP.setRequestHeader("session_user", currentSession);
        Xu_ly_HTTP.send();
    }
}
