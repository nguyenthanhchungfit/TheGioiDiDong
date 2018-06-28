var host = "http://localhost:8002";

$(document).ready(function () {
    updateConnectionToServer();
})

$("#home_button").on('click', function (e) {
    e.preventDefault();
    loadDanhSachPhone();
});

$("#mobile_button").on('click', function (e) {
    e.preventDefault();
    loadDanhSachPhone();
});

$("#laptop_button").on('click', function (e) {
    e.preventDefault();
    loadDanhSachLaptop();
});

$("#tablet_button").on('click', function (e) {
    e.preventDefault();
    loadDanhSachTablet();
});

$("#btnLogin").on('click', function () {
    var account = $("#account").val();
    var password = $("#password").val();
    if (account == "" || password == "") {
        $("#loginError").css("color", "red");
        $("#loginError").text("Vui lòng nhập đầy đủ thông tin!");
        return;
    }
    loginUser(account, password);


});

$("#logout_account_li").on('click', function () {
    logoutUser();
});

$("#mycart").on('click', function () {
    alert("my cart click");
})

$("#danh_sach_sp").on('click', 'button', function (e) {
    $parentID = $(this).parent().parent().parent();
    var id = $parentID.attr("id");
    var orders = localStorage.getItem("orders");
    if (orders == undefined) {
        orders = [];
    } else {
        orders = JSON.parse(orders);
    }

    alert(id);
    var flag = false;
    for (var i = 0; i < orders.length; i++) {
        if (id == orders[i]) {
            alert("Sản phẩm đã có trong giỏ hàng!");
            flag = true;
            break;
        }
    }
    if (flag == false) {
        orders.push(id);
    }
    $("#so_luong_sach").text(orders.length);
    localStorage.setItem("orders", JSON.stringify(orders));

})

// -----------------------------Tạo giao diện
function Tao_The_hien_Mobile(objData) {
    if (objData) {
        var typeUser = localStorage.getItem("type");
        if (typeUser == undefined) {
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

        for (var i = 0; i < length; i++) {
            var rowItem
            if (i % 6 == 0) {
                rowItem = document.createElement("div");
                rowItem.className = "row";
            }
            var phone = objData[i];
            var ma_dien_thoai = phone.ma_dien_thoai;
            var ten_dien_thoai = phone.ten_dien_thoai;
            var gia = phone.gia.toLocaleString("vi");
            var ma_hinh = phone.ma_hinh;
            var so_luong_ton = "Số lượng tồn: " + phone.so_luong_ton;

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
            if (typeUser == 2) {
                var pSoLuongTon = document.createElement("p");
                pSoLuongTon.id = "so_luong_ton_pro";
                pSoLuongTon.innerText = so_luong_ton;
                divProductBody.appendChild(pSoLuongTon);
            }

            // 1.2.3 Tạo button add to cart
            if (typeUser == 2) {
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
            if ((i == length - 1) || ((i % 6) == 5)) {
                container.appendChild(rowItem);
            }
        }

        return container;
    }
}

function Tao_The_hien_Laptop(objData) {
    if (objData) {
        var typeUser = localStorage.getItem("type");
        if (typeUser == undefined) {
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

        for (var i = 0; i < length; i++) {
            var rowItem
            if (i % 6 == 0) {
                rowItem = document.createElement("div");
                rowItem.className = "row";
            }
            var laptop = objData[i];
            var ma_laptop = laptop.ma_laptop;
            var ten_laptop = laptop.ten_laptop;
            var gia = laptop.gia.toLocaleString("vi");
            var ma_hinh = laptop.ma_hinh;
            var so_luong_ton = "Số lượng tồn: " + laptop.so_luong_ton;

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

            if (typeUser == 2) {
                var pSoLuongTon = document.createElement("p");
                pSoLuongTon.id = "so_luong_ton_pro";
                pSoLuongTon.innerText = so_luong_ton;
                divProductBody.appendChild(pSoLuongTon);
            }

            // 1.2.3 Tạo button add to cart
            if (typeUser == 2) {
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
            if ((i == length - 1) || ((i % 6) == 5)) {
                container.appendChild(rowItem);
            }
        }

        return container;
    }
}

function Tao_The_hien_Tablet(objData) {
    if (objData) {
        var typeUser = localStorage.getItem("type");
        if (typeUser == undefined) {
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

        for (var i = 0; i < length; i++) {
            var rowItem
            if (i % 6 == 0) {
                rowItem = document.createElement("div");
                rowItem.className = "row";
            }
            var tablet = objData[i];
            var ma_tablet = tablet.ma_tablet;
            var ten_tablet = tablet.ten_tablet;
            var gia = tablet.gia.toLocaleString("vi");
            var ma_hinh = tablet.ma_hinh;
            var so_luong_ton = "Số lượng tồn: " + tablet.so_luong_ton;

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

            if (typeUser == 2) {
                var pSoLuongTon = document.createElement("p");
                pSoLuongTon.id = "so_luong_ton_pro";
                pSoLuongTon.innerText = so_luong_ton;
                divProductBody.appendChild(pSoLuongTon);
            }

            // 1.2.3 Tạo button add to cart
            if (typeUser == 2) {
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
            if ((i == length - 1) || ((i % 6) == 5)) {
                container.appendChild(rowItem);
            }
        }

        return container;
    }
}

function Cap_nhat_The_hien_Theo_Loai_Nguoi_dung(type) {
    if (type == 1 || type == 2 || type == 3) {
        $("#login_button_li").css("display", "none");
        $("#login_account_li").css("display", "");
        $("#logout_account_li").css("display", "");
        if (type == 1) {
            $('#account_name').text("Khách hàng");
            $('#account_name').attr("href", "#");
        } else if (type == 2) {
            $('#account_name').text("Nhân viên");
            $('#account_name').attr("href", "#");
            $("#mycart").css("display", "");
        } else if (type == 3) {
            $('#account_name').text("Quản lý");
            $('#account_name').attr("href", "/admin");
        }
    } else {
        $("#login_button_li").css("display", "");
        $("#login_account_li").css("display", "none");
        $("#logout_account_li").css("display", "none");
        $("#mycart").css("display", "none");
    }
}
// -----------------------------Xử lý nghiệp vụ


// -----------------------------Thực hiện đọc/ghi dữ liệu
function loadDanhSachPhone() {
    var currentSession = localStorage.getItem("sessionID");
    if (currentSession == undefined) {
        currentSession = -1;
    }
    var Xu_ly_HTTP = new XMLHttpRequest();
    var linkRequest = host + "/getAllMobileForHome";
    Xu_ly_HTTP.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var objData = JSON.parse(this.responseText);
            console.log(objData);
            if (objData.error) {
                $("#danh_sach_sp").html("No Data Tranfser");
            } else {
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

function loadDanhSachLaptop() {
    var currentSession = localStorage.getItem("sessionID");
    if (currentSession == undefined) {
        currentSession = -1;
    }

    var Xu_ly_HTTP = new XMLHttpRequest();
    var linkRequest = host + "/getAllLaptopForHome";
    Xu_ly_HTTP.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var objData = JSON.parse(this.responseText);
            console.log(objData);
            if (objData.error) {
                $("#danh_sach_sp").html("No Data Tranfser");
            } else {
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

function loadDanhSachTablet() {
    var currentSession = localStorage.getItem("sessionID");
    if (currentSession == undefined) {
        currentSession = -1;
    }

    var Xu_ly_HTTP = new XMLHttpRequest();
    var linkRequest = host + "/getAllTabletForHome";
    Xu_ly_HTTP.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var objData = JSON.parse(this.responseText);
            console.log(objData);
            if (objData.error) {
                $("#danh_sach_sp").html("No Data Tranfser");
            } else {
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

function updateSoLuongThietBi() {
    var orders = localStorage.getItem("orders");
    if (orders == undefined) {
        orders = [];
    } else {
        orders = JSON.parse(orders);
    }
    $("#so_luong_sach").text(orders.length);
}

// Connection

function loginUser(username, password) {

    var account = `username=${username}&password=${password}`;
    //var account = {username : username, password : password};

    var currentSession = localStorage.getItem("sessionID");
    if (currentSession == undefined) {
        currentSession = -1;
    }
    var Xu_ly_HTTP = new XMLHttpRequest();
    var linkRequest = host + "/loginUser";
    Xu_ly_HTTP.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var objData = JSON.parse(this.responseText);
            console.log(objData);
            if (typeof (Storage) !== "undefined") {
                if (!objData.error) {
                    localStorage.setItem("sessionID", objData.sessionID);
                    localStorage.setItem("type", objData.type);
                    Cap_nhat_The_hien_Theo_Loai_Nguoi_dung(objData.type);
                    loadDanhSachPhone();
                } else {
                    alert(objData.error);
                }
            } else {
                alert('Sorry! No Web Storage support..');
            }
        }
    };
    Xu_ly_HTTP.open("POST", linkRequest, true);
    Xu_ly_HTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    Xu_ly_HTTP.setRequestHeader("session_user", currentSession);
    Xu_ly_HTTP.send(account);
}

function logoutUser() {
    var currentSession = localStorage.getItem("sessionID");
    if (currentSession == undefined) {
        currentSession = -1;
    } else {
        var Xu_ly_HTTP = new XMLHttpRequest();
        var linkRequest = host + "/logout";
        Xu_ly_HTTP.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var objData = JSON.parse(this.responseText);
                if (objData.success == "OK") {
                    localStorage.removeItem("sessionID");
                    localStorage.removeItem("type");
                    localStorage.removeItem("orders");
                    Cap_nhat_The_hien_Theo_Loai_Nguoi_dung(0);
                }
            }
        };
        Xu_ly_HTTP.open("GET", linkRequest, true);
        Xu_ly_HTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        Xu_ly_HTTP.setRequestHeader("session_user", currentSession);
        Xu_ly_HTTP.send();
    }
}

function updateConnectionToServer() {
    var currentSession = localStorage.getItem("sessionID");
    if (currentSession == undefined || currentSession == -1) {
        localStorage.setItem("type", 0);
        Cap_nhat_The_hien_Theo_Loai_Nguoi_dung(0);
        loadDanhSachPhone();
    } else {
        var typeUser = localStorage.getItem("type");
        if (typeUser == 1 || typeUser == 2 || typeUser == 3) {
            var Xu_ly_HTTP = new XMLHttpRequest();
            var linkRequest = host + "/getConnection";
            Xu_ly_HTTP.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var objData = JSON.parse(this.responseText);
                    if (typeof (Storage) !== "undefined") {
                        if(!objData.error){
                            localStorage.setItem("sessionID", objData.sessionID);
                            localStorage.setItem("type", objData.type);
                            Cap_nhat_The_hien_Theo_Loai_Nguoi_dung(objData.type);
                            if(objData.type==3)
                            {
                                loadDanhSachPhoneforAD();
                            }
                            else
                            {
                            loadDanhSachPhone();
                            updateSoLuongThietBi();
                            }
                        }else{
                            alert(objData.error);
                            Cap_nhat_The_hien_Theo_Loai_Nguoi_dung(0);
                            loadDanhSachPhone();
                        }
                    } else {
                        alert('Sorry! No Web Storage support..');
                        Cap_nhat_The_hien_Theo_Loai_Nguoi_dung(0);
                        loadDanhSachPhone();
                    }
                }
            };
            Xu_ly_HTTP.open("GET", linkRequest, true);
            Xu_ly_HTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            Xu_ly_HTTP.setRequestHeader("session_user", currentSession);
            Xu_ly_HTTP.send();
        }else{
            Cap_nhat_The_hien_Theo_Loai_Nguoi_dung(0);
            loadDanhSachPhone();
        }
    }
}



//Xử lí admin
var host = "http://localhost:8002";

$(document).ready(function(){
    $("#idTbody").empty();    
    loadDanhSachPhone();
})
$("#dataTable").on('change', 'input', function(){
        var duoc_ban=$(this).attr("checked");
        if(duoc_ban=="checked")
        {
            duoc_ban=0;
        }
        else{
           duoc_ban=1;
        }
    $("#dataTable").on('click', 'button', function(e){
        $check = $(this).parent().prev().children().children();
        $soluong=$check.parent().parent().prev().children();
        var soluong=$soluong.val();
        $gia=$soluong.parent().prev().children();
        var gia=$gia.val();
        $ma=$(this).next();
        var ma=$ma.val();
        update(ma,gia,soluong,duoc_ban);
   })
});


$("#mobile").on('click', function(e){
    e.preventDefault();
    $("#idTbody").empty();
    loadDanhSachPhone();
});

$("#laptop").on('click', function(e){
    e.preventDefault();
    $("#idTbody").empty();    
    loadDanhSachLaptop();
});

$("#tablet").on('click', function(e){
    e.preventDefault();
    $("#idTbody").empty();    
    loadDanhSachTablet();
});


// -----------------------------Tạo giao diện
function Tao_The_Hien_MobileforAD(objData){
    console.log("trProduct-------------");
  if(objData){
      var typeUser = localStorage.getItem("type");
      if(typeUser == undefined){
          typeUser = 0;
      }

      var length = objData.length;
      var Table = document.getElementById("dataTable");
      
      var bodyTable=Table.getElementsByTagName("tbody")[0];

      for(var i = 0; i < length; i++){
          var phone = objData[i];
          var ma_dien_thoai = phone.ma_dien_thoai;
          var ten_dien_thoai = phone.ten_dien_thoai;
          var gia = phone.gia;
          var ma_hinh = phone.ma_hinh;
          var so_luong_ton=phone.so_luong_ton;
          var duoc_ban=phone.duoc_ban;

          console.log("--------------------------------");
          console.log(phone);
          
          // 1.Tạo tr Product
          var trProduct = document.createElement("tr");
          trProduct.id = ma_dien_thoai;

          // 1.1 Tạo td hình
          var tdProductImg = document.createElement("td");

          var aProductImg = document.createElement("a");
          aProductImg.href = "/phone?id=" + ma_dien_thoai;

          var imgProductImg = document.createElement("img"); 
          imgProductImg.src = "./img/mobile/" + ma_hinh;
          imgProductImg.setAttribute("height","60");
          imgProductImg.setAttribute("width","60");

          aProductImg.appendChild(imgProductImg);
          tdProductImg.appendChild(aProductImg);
          trProduct.appendChild(tdProductImg);

          // 1.2 Tạo td tên sản phẩm
          var tdProductName = document.createElement("td");
          tdProductName.innerText = ten_dien_thoai;
          trProduct.appendChild(tdProductName);

          // 1.3 Tạo td giá 
          var tdProductPrice = document.createElement("td");
          tdProductPrice.innerHTML=`<input class="form-control gia" type="number" placeholder="" value="${gia}" >
          <span class="input-group-append">`;
          trProduct.appendChild(tdProductPrice);
          // 1.3 Tạo td số lượng tồn 
          var tdProductQuantity = document.createElement("td");
          tdProductQuantity.innerHTML = `<input class="form-control soluong" type="number" placeholder="" value="${so_luong_ton}" >
          <span class="input-group-append">`;
          trProduct.appendChild(tdProductQuantity);
          //1.4 Tạo td isSelling
          var tdProductISSelling = document.createElement("td");
        var labelC=document.createElement("label");
        labelC.setAttribute("class","container");
        var spanC=document.createElement("span");
        spanC.setAttribute("class","checkmark");
        var inputC=document.createElement("input");
        inputC.setAttribute("type","checkbox");
        if(duoc_ban==1){
            inputC.setAttribute("checked","");
        }
        labelC.appendChild(inputC);
        labelC.appendChild(spanC);
        tdProductISSelling.appendChild(labelC);
        trProduct.appendChild(tdProductISSelling);
          // 1.5 Tạo button update
          var tdProductUpdate = document.createElement("td");
          tdProductUpdate.innerHTML = `<button type="button"  class="btn btn-info update">
          <span class="glyphicon glyphicon-search"></span> Update
        </button><input class="ProId" type="hidden" value="${ma_dien_thoai}">`;

        trProduct.appendChild(tdProductUpdate);

         bodyTable.appendChild(trProduct);
      }
  }
}

function Tao_The_Hien_LaptopforAD(objData){
    console.log("trProduct-------------");
  if(objData){
      var typeUser = localStorage.getItem("type");
      if(typeUser == undefined){
          typeUser = 0;
      }

      var length = objData.length;
      var Table = document.getElementById("dataTable");
      
      var bodyTable=Table.getElementsByTagName("tbody")[0];

      for(var i = 0; i < length; i++){
          var laptop = objData[i];
          var ma_laptop = laptop.ma_laptop;
          var ten_laptop = laptop.ten_laptop;
          var gia = laptop.gia;
          var ma_hinh = laptop.ma_hinh;
          var so_luong_ton=laptop.so_luong_ton;
          var duoc_ban=laptop.duoc_ban;

          console.log("--------------------------------");
          console.log(laptop);
          
          // 1.Tạo tr Product
          var trProduct = document.createElement("tr");
          trProduct.id = ma_laptop;

          // 1.1 Tạo td hình
          var tdProductImg = document.createElement("td");

          var aProductImg = document.createElement("a");
          aProductImg.href = "/laptop?id=" + ma_laptop;

          var imgProductImg = document.createElement("img"); 
          imgProductImg.src = "./img/laptop/" + ma_hinh;
          imgProductImg.setAttribute("height","60");
          imgProductImg.setAttribute("width","60");

          aProductImg.appendChild(imgProductImg);
          tdProductImg.appendChild(aProductImg);
          trProduct.appendChild(tdProductImg);

          // 1.2 Tạo td tên sản phẩm
          var tdProductName = document.createElement("td");
          tdProductName.innerText = ten_laptop;
          trProduct.appendChild(tdProductName);

          // 1.3 Tạo td giá 
          var tdProductPrice = document.createElement("td");
          tdProductPrice.innerHTML=`<input class="form-control" type="number" placeholder="" value="${gia}" id="gia">
          <span class="input-group-append">`;
          trProduct.appendChild(tdProductPrice);
          // 1.3 Tạo td số lượng tồn 
          var tdProductQuantity = document.createElement("td");
          tdProductQuantity.innerHTML = `<input class="form-control" type="number" placeholder="" value="${so_luong_ton}" id="soluong">
          <span class="input-group-append">`;
          trProduct.appendChild(tdProductQuantity);
          //1.4 Tạo td isSelling
          var tdProductISSelling = document.createElement("td");
        var labelC=document.createElement("label");
        labelC.setAttribute("class","container");
        var spanC=document.createElement("span");
        spanC.setAttribute("class","checkmark");
        var inputC=document.createElement("input");
        inputC.setAttribute("type","checkbox");
        if(duoc_ban==1){
            inputC.setAttribute("checked","");
        }
        labelC.appendChild(inputC);
        labelC.appendChild(spanC);
        tdProductISSelling.appendChild(labelC);
        trProduct.appendChild(tdProductISSelling);
          // 1.5 Tạo button update
          var tdProductUpdate = document.createElement("td");
          tdProductUpdate.innerHTML = `<button id="update" type="button"  class="btn btn-info">
          <span class="glyphicon glyphicon-search"></span> Update
        </button><input class="ProId" type="hidden" value="${ma_laptop}">`;

        trProduct.appendChild(tdProductUpdate);

         bodyTable.appendChild(trProduct);
      }
  }
}

function Tao_The_Hien_TabletforAD(objData){
    console.log("trProduct-------------");
  if(objData){
      var typeUser = localStorage.getItem("type");
      if(typeUser == undefined){
          typeUser = 0;
      }

      var length = objData.length;
      var Table = document.getElementById("dataTable");
      
      var bodyTable=Table.getElementsByTagName("tbody")[0];

      for(var i = 0; i < length; i++){
          var tablet = objData[i];
          var ma_tablet = tablet.ma_tablet;
          var ten_tablet = tablet.ten_tablet;
          var gia = tablet.gia;
          var ma_hinh = tablet.ma_hinh;
          var so_luong_ton=tablet.so_luong_ton;
          var duoc_ban=tablet.duoc_ban;
          
          console.log(tablet);
          // 1.Tạo tr Product
          var trProduct = document.createElement("tr");
          trProduct.id = ma_tablet;

          // 1.1 Tạo td hình
          var tdProductImg = document.createElement("td");

          var aProductImg = document.createElement("a");
          aProductImg.href = "/tablet?id=" + ma_tablet;

          var imgProductImg = document.createElement("img"); 
          imgProductImg.src = "./img/tablet/" + ma_hinh;
          imgProductImg.setAttribute("height","60");
          imgProductImg.setAttribute("width","60");

          aProductImg.appendChild(imgProductImg);
          tdProductImg.appendChild(aProductImg);
          trProduct.appendChild(tdProductImg);

          // 1.2 Tạo td tên sản phẩm
          var tdProductName = document.createElement("td");
          tdProductName.innerText = ten_tablet;
          trProduct.appendChild(tdProductName);

          // 1.3 Tạo td giá 
          var tdProductPrice = document.createElement("td");
          tdProductPrice.innerHTML=`<input class="form-control" type="number" placeholder="" value="${gia}" id="gia">
          <span class="input-group-append">`;
          trProduct.appendChild(tdProductPrice);
          // 1.3 Tạo td số lượng tồn 
          var tdProductQuantity = document.createElement("td");
          tdProductQuantity.innerHTML = `<input class="form-control" type="number" placeholder="" value="${so_luong_ton}" id="soluong">
          <span class="input-group-append">`;
          trProduct.appendChild(tdProductQuantity);
          //1.4 Tạo td isSelling
          var tdProductISSelling = document.createElement("td");
        var labelC=document.createElement("label");
        labelC.setAttribute("class","container");
        var spanC=document.createElement("span");
        spanC.setAttribute("class","checkmark");
        var inputC=document.createElement("input");
        inputC.setAttribute("type","checkbox");
        if(duoc_ban==1){
            inputC.setAttribute("checked","");
        }
        labelC.appendChild(inputC);
        labelC.appendChild(spanC);
        tdProductISSelling.appendChild(labelC);
        trProduct.appendChild(tdProductISSelling);
          // 1.5 Tạo button update
          var tdProductUpdate = document.createElement("td");
          tdProductUpdate.innerHTML = `<button id="update" type="button" class="btn btn-info">
          <span class="glyphicon glyphicon-search"></span> Update
        </button><input class="ProId" type="hidden" value="${ma_tablet}">`;

        trProduct.appendChild(tdProductUpdate);

         bodyTable.appendChild(trProduct);
      }
  }
}
// -----------------------------Thực hiện đọc/ghi dữ liệu
function loadDanhSachPhoneforAD(){
  var currentSession = localStorage.getItem("sessionID");
  if(currentSession == undefined){
      currentSession = -1;
  }
  var Xu_ly_HTTP = new XMLHttpRequest();
  var linkRequest = host + "/getAllMobileForAD";
  Xu_ly_HTTP.onreadystatechange = function(){
      if(this.readyState == 4 && this.status  == 200){
          var objData = JSON.parse(this.responseText);
          console.log(objData);
          if(objData.error){
              $("#danh_sach_sp").html("No Data Tranfser");
          }else{
              console.log("-----------------------------------------------------------------------------")
              Tao_The_Hien_MobileforAD(objData);
          }
          
      }
  };
  Xu_ly_HTTP.open("GET", linkRequest, true);
  Xu_ly_HTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  Xu_ly_HTTP.setRequestHeader("session_user", currentSession);
  Xu_ly_HTTP.send();
}

function loadDanhSachLaptopforAD(){
    var currentSession = localStorage.getItem("sessionID");
    if(currentSession == undefined){
        currentSession = -1;
    }
    var Xu_ly_HTTP = new XMLHttpRequest();
    var linkRequest = host + "/getAllLaptopForAD";
    Xu_ly_HTTP.onreadystatechange = function(){
        if(this.readyState == 4 && this.status  == 200){
            var objData = JSON.parse(this.responseText);
            console.log(objData);
            if(objData.error){
                $("#danh_sach_sp").html("No Data Tranfser");
            }else{
                console.log("-----------------------------------------------------------------------------")
                Tao_The_Hien_LaptopforAD(objData);
            }
            
        }
    };
    Xu_ly_HTTP.open("GET", linkRequest, true);
    Xu_ly_HTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    Xu_ly_HTTP.setRequestHeader("session_user", currentSession);
    Xu_ly_HTTP.send();
  }


  function loadDanhSachTabletforAD(){
    var currentSession = localStorage.getItem("sessionID");
    if(currentSession == undefined){
        currentSession = -1;
    }
    var Xu_ly_HTTP = new XMLHttpRequest();
    var linkRequest = host + "/getAllTabletForAD";
    Xu_ly_HTTP.onreadystatechange = function(){
        if(this.readyState == 4 && this.status  == 200){
            var objData = JSON.parse(this.responseText);
            console.log(objData);
            if(objData.error){
                $("#danh_sach_sp").html("No Data Tranfser");
            }else{
                console.log("-----------------------------------------------------------------------------")
                Tao_The_Hien_TabletforAD(objData);
            }
            
        }
    };
    Xu_ly_HTTP.open("GET", linkRequest, true);
    Xu_ly_HTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    Xu_ly_HTTP.setRequestHeader("session_user", currentSession);
    Xu_ly_HTTP.send();
  }

  function update(proId,gia,soluong,duoc_ban){
    var data = `proId=${proId}&gia=${gia}&soluong=${soluong}&duoc_ban=${duoc_ban}`;
    //var account = {username : username, password : password};
    var currentSession = localStorage.getItem("sessionID");
    if(currentSession == undefined){
        currentSession = -1;
    }
    var Xu_ly_HTTP = new XMLHttpRequest();
    var linkRequest = host + "/update";
    Xu_ly_HTTP.onreadystatechange = function(){
        if(this.readyState == 4 && this.status  == 200){
            var objData = JSON.parse(this.responseText);
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
    Xu_ly_HTTP.send(data);
}


