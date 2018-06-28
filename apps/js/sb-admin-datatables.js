var host = "http://localhost:8002";

$(document).ready(function(){
    $("#idTbody").empty();    
    loadDanhSachPhone();
})
$("#dataTable").on('change', 'input', function(){
        var duoc_ban=$(this).attr("checked");
        if(duoc_ban=="checked")
        {
            duoc_ban=true;
        }
        else{
           duoc_ban=false;
        }
        duoc_ban=!duoc_ban;
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
function Tao_The_Hien_Mobile(objData){
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

function Tao_The_Hien_Laptop(objData){
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

function Tao_The_Hien_Tablet(objData){
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
function loadDanhSachPhone(){
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
              Tao_The_Hien_Mobile(objData);
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
    var linkRequest = host + "/getAllLaptopForAD";
    Xu_ly_HTTP.onreadystatechange = function(){
        if(this.readyState == 4 && this.status  == 200){
            var objData = JSON.parse(this.responseText);
            console.log(objData);
            if(objData.error){
                $("#danh_sach_sp").html("No Data Tranfser");
            }else{
                console.log("-----------------------------------------------------------------------------")
                Tao_The_Hien_Laptop(objData);
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
    var linkRequest = host + "/getAllTabletForAD";
    Xu_ly_HTTP.onreadystatechange = function(){
        if(this.readyState == 4 && this.status  == 200){
            var objData = JSON.parse(this.responseText);
            console.log(objData);
            if(objData.error){
                $("#danh_sach_sp").html("No Data Tranfser");
            }else{
                console.log("-----------------------------------------------------------------------------")
                Tao_The_Hien_Tablet(objData);
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


