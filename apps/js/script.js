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
    $("#password").val("");
});

$("#logout_account_li").on('click', function () {
    logoutUser();
});

$("#mycart").on('click', function () {
    $("#danh_sach_sp").html("");
    $("#danh_sach_don_hang").html(Tao_The_hien_Danh_sach_Don_hang());
})

$("#danh_sach_sp").on('click', 'button', function (e) {
    $parentID = $(this).parent().parent().parent();

    var $so_luong_ton = $(this).parent().prev();
    var $ten_san_pham = $so_luong_ton.prev().children("a");
    var $gia_san_pham = $so_luong_ton.prev().prev();
    var $image = $(this).parent().parent().prev().children("a").children("img");

    var id = $parentID.attr("id");
    var str_so_luong_ton = $so_luong_ton.text();
    var i_space_SLT = str_so_luong_ton.lastIndexOf(' ');
    var length_SLT = str_so_luong_ton.length;
    var so_luong_ton = str_so_luong_ton.substring(i_space_SLT + 1, length_SLT);
    var ten_san_pham = $ten_san_pham.text();
    var gia_san_pham = $gia_san_pham.text().split('.').join('');
    var image = $image.attr("src");

    var product = {
        id: id,
        ten_san_pham: ten_san_pham,
        so_luong_ton: so_luong_ton,
        gia_san_pham: gia_san_pham,
        image: image
    };

    var orders = localStorage.getItem("orders");
    if (orders == undefined) {
        orders = [];
    } else {
        orders = JSON.parse(orders);
    }


    var flag = false;
    for (var i = 0; i < orders.length; i++) {
        if (id == orders[i].id) {
            alert("Sản phẩm đã có trong giỏ hàng!");
            flag = true;
            break;
        }
    }
    if (flag == false) {
        orders.push(product);
    }
    $("#so_luong_sach").text(orders.length);
    localStorage.setItem("orders", JSON.stringify(orders));

})

$("#danh_sach_don_hang").on('change', 'input', function (e) {
    var $don_gia = $(this).parent().next();
    var $thanh_tien = $don_gia.next();

    var so_luong = $(this).val();
    var don_gia = $don_gia.text();
    var thanh_tien = so_luong * don_gia;

    $thanh_tien.text(thanh_tien);

    var products = getListHoaDon();
    var tong_tien = getTongTien(products);
    $("#tong_tien_val").text(tong_tien);
})

$("#danh_sach_don_hang").on('click', 'button#btn_tien_hanh_thanh_toan', function () {

    $("#thong_tin_thanh_toan").html(Tao_The_hien_Nhap_Thong_tin_Thanh_Toan());
})

$("#danh_sach_don_hang").on('click', 'button#btn_xac_nhan_thanh_toan', function () {
    LuuThongTinDonHang();
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

function Tao_The_hien_Danh_sach_Don_hang() {
    var orders = localStorage.getItem("orders");
    if (orders == undefined) {
        orders = [];
    } else {
        orders = JSON.parse(orders);
    }

    var length = orders.length;
    if (length > 0) {

        var divContainer = document.createElement("div");
        divContainer.className = "container";

        var divTitle = document.createElement("div");
        divTitle.classList = "row title_thong_tin_don_hang";
        divTitle.innerText = "Thông Tin Giỏ Hàng";

        divContainer.appendChild(divTitle);

        // header bang
        // 1.1
        var divRowTitle = document.createElement("div");
        divRowTitle.className = "row item item_don_hang title_don_hang";
        // 1.1.1
        var divColImage = document.createElement("div");
        divColImage.className = "col-md-2";
        // 1.1.2
        var divColName = document.createElement("div");
        divColName.className = "col-md-2";
        divColName.innerText = "Tên";

        // 1.1.3
        var divColSLT = document.createElement("div");
        divColSLT.className = "col-md-2";
        divColSLT.innerText = "Số lượng tồn"

        // 1.1.4
        var divColSLM = document.createElement("div");
        divColSLM.className = "col-md-2";
        divColSLM.innerText = "Số lượng mua";

        // 1.1.5
        var divColDonGia = document.createElement("div");
        divColDonGia.className = "col-md-2";
        divColDonGia.innerText = "Đơn giá"

        // 1.1.6
        var divColThanhTien = document.createElement("div");
        divColThanhTien.className = "col-md-2";
        divColThanhTien.innerText = "Thành tiền";

        // 1.1 Add
        divRowTitle.appendChild(divColImage);
        divRowTitle.appendChild(divColName);
        divRowTitle.appendChild(divColSLT);
        divRowTitle.appendChild(divColSLM);
        divRowTitle.appendChild(divColDonGia);
        divRowTitle.appendChild(divColThanhTien);

        // 1 Add
        divContainer.appendChild(divRowTitle);

        //------------------- Add content

        var tong_tien = 0;

        for (var i = 0; i < length; i++) {
            var order = orders[i];

            var id = order.id;
            var ten_san_pham = order.ten_san_pham;
            var so_luong_ton = order.so_luong_ton;
            var image = order.image;
            var gia_san_pham = order.gia_san_pham;
            tong_tien += (gia_san_pham - 0);


            // header bang
            // 1.1
            var divRowContent = document.createElement("div");
            divRowContent.setAttribute("id", id);
            divRowContent.className = "row item border item_don_hang border_don_hang content_don_hang";
            // 1.1.1
            var divRowImage = document.createElement("div");
            divRowImage.className = "col-md-2";
            var imgRowImage = document.createElement("img");
            imgRowImage.className = "img_thubnail_don_hang";
            imgRowImage.src = image;
            divRowImage.appendChild(imgRowImage);

            // 1.1.2
            var divRowName = document.createElement("div");
            divRowName.className = "col-md-2";
            divRowName.innerText = ten_san_pham;

            // 1.1.3
            var divRowSLT = document.createElement("div");
            divRowSLT.className = "col-md-2";
            divRowSLT.innerText = so_luong_ton;

            // 1.1.4
            var divRowSLM = document.createElement("div");
            divRowSLM.className = "col-md-2";
            var inputRowSLM = document.createElement("input");
            inputRowSLM.setAttribute("onkeydown", "return false;");
            inputRowSLM.setAttribute("value", "1");
            inputRowSLM.setAttribute("type", "number");
            inputRowSLM.setAttribute("name", "SLM");
            inputRowSLM.setAttribute("min", "0");
            inputRowSLM.setAttribute("max", `${so_luong_ton}`);
            divRowSLM.appendChild(inputRowSLM);

            // 1.1.5
            var divRowDonGia = document.createElement("div");
            divRowDonGia.className = "col-md-2";
            divRowDonGia.innerText = gia_san_pham;

            // 1.1.6
            var divRowThanhTien = document.createElement("div");
            divRowThanhTien.className = "col-md-2";
            divRowThanhTien.innerText = gia_san_pham;

            // 1.1 Add
            divRowContent.appendChild(divRowImage);
            divRowContent.appendChild(divRowName);
            divRowContent.appendChild(divRowSLT);
            divRowContent.appendChild(divRowSLM);
            divRowContent.appendChild(divRowDonGia);
            divRowContent.appendChild(divRowThanhTien);

            // 1 Add
            divContainer.appendChild(divRowContent);
        }

        var divBTT = document.createElement("div");
        divBTT.className = "row";

        // 1.1
        var divColEmpty = document.createElement("div");
        divColEmpty.className = "col-md-6";

        // 1.2
        var divColButtonTT = document.createElement("div");
        divColButtonTT.className = "col-md-4";
        var buttonTinhTien = document.createElement("button");
        buttonTinhTien.setAttribute("type", "button");
        buttonTinhTien.setAttribute("id", "btn_tien_hanh_thanh_toan");
        buttonTinhTien.setAttribute("class", "btn btn-success text-center");
        buttonTinhTien.innerText = "Tiến hành thanh toán";
        divColButtonTT.appendChild(buttonTinhTien);

        // 1.3
        var divTongTien = document.createElement("div");
        divTongTien.className = "col-md-2";
        var spanTongTien = document.createElement("span");
        spanTongTien.innerText = "Tổng tiền: ";
        var spanTongTienVal = document.createElement("span");
        spanTongTienVal.setAttribute("id", "tong_tien_val");
        spanTongTienVal.innerText = tong_tien.toLocaleString("vi");
        divTongTien.appendChild(spanTongTien);
        divTongTien.appendChild(spanTongTienVal);

        divBTT.appendChild(divColEmpty);
        divBTT.appendChild(divColButtonTT);
        divBTT.appendChild(divTongTien);

        divContainer.appendChild(divBTT);

        var idThanhToan = document.createElement("div");
        idThanhToan.setAttribute("id", "thong_tin_thanh_toan");

        divContainer.appendChild(idThanhToan);
    }
    return divContainer;

}

function Tao_The_hien_Nhap_Thong_tin_Thanh_Toan() {
    var tong_tien = $("#tong_tien_val").text();
    if (tong_tien == 0) {
        alert("Hóa đơn trống");
        return "";
    } else {
        var divContainer = document.createElement("div");
        divContainer.className = "container-fluid";

        //----------------------------------------------------

        var divRowNguoiMua = document.createElement("div");
        divRowNguoiMua.className = "row";

        var divColLabelNguoiMua = document.createElement("div");
        divColLabelNguoiMua.setAttribute("class", "col-md-2 title_don_hang");
        divColLabelNguoiMua.innerText = "Họ tên khách:"

        var divColValueNguoiMua = document.createElement("div");
        divColValueNguoiMua.className = "col-md-5";

        var inputColNguoiMua = document.createElement("input");
        inputColNguoiMua.setAttribute("type", "text");
        inputColNguoiMua.setAttribute("id", "ten_nguoi_mua");
        inputColNguoiMua.setAttribute("name", "ten_nguoi_mua");
        inputColNguoiMua.setAttribute("placeholder", "Nhập tên");

        divColValueNguoiMua.appendChild(inputColNguoiMua);

        divRowNguoiMua.appendChild(divColLabelNguoiMua);
        divRowNguoiMua.appendChild(divColValueNguoiMua);

        // ---------------------------------------------------

        var divRowDienThoai = document.createElement("div");
        divRowDienThoai.className = "row";

        var divColLabelDienThoai = document.createElement("div");
        divColLabelDienThoai.setAttribute("class", "col-md-2 title_don_hang");
        divColLabelDienThoai.innerHTML = "Số điện thoại"

        var divColValueDienThoai = document.createElement("div");
        divColValueDienThoai.className = "col-md-5";

        var inputColDienThoai = document.createElement("input");
        inputColDienThoai.setAttribute("type", "text");
        inputColDienThoai.setAttribute("id", "dien_thoai");
        inputColDienThoai.setAttribute("name", "dien_thoai");
        inputColDienThoai.setAttribute("placeholder", "Nhập số điện thoại");

        divColValueDienThoai.appendChild(inputColDienThoai);

        divRowDienThoai.appendChild(divColLabelDienThoai);
        divRowDienThoai.appendChild(divColValueDienThoai);

        // ---------------------------------------------------

        var divRowDiaChi = document.createElement("div");
        divRowDiaChi.className = "row";

        var divColLabelDiaChi = document.createElement("div");
        divColLabelDiaChi.setAttribute("class", "col-md-2 title_don_hang");
        divColLabelDiaChi.innerText = "Địa chỉ:"

        var divColValueDiaChi = document.createElement("div");
        divColValueDiaChi.className = "col-md-5";

        var inputColDiaChi = document.createElement("input");
        inputColDiaChi.setAttribute("type", "text");
        inputColDiaChi.setAttribute("id", "dia_chi");
        inputColDiaChi.setAttribute("name", "dia_chi");
        inputColDiaChi.setAttribute("placeholder", "Nhập địa chỉ");

        divColValueDiaChi.appendChild(inputColDiaChi);

        divRowDiaChi.appendChild(divColLabelDiaChi);
        divRowDiaChi.appendChild(divColValueDiaChi);

        // ---------------------------------------------------
        divContainer.appendChild(divRowNguoiMua);
        divContainer.appendChild(divRowDienThoai);
        divContainer.appendChild(divRowDiaChi);


        var divButtonContainer = document.createElement("div");
        divButtonContainer.className = "row";

        var divButtonEmpty = document.createElement("div");
        divButtonEmpty.className = "col-md-6";


        var divButtonContent = document.createElement("div");
        divButtonContent.className = "col-md-3";
        var buttonXacNhanThanhToan = document.createElement("button");
        buttonXacNhanThanhToan.classList = "btn btn-success text-center title_don_hang";
        buttonXacNhanThanhToan.innerText = "Xác nhận thanh toán";
        buttonXacNhanThanhToan.setAttribute("id", "btn_xac_nhan_thanh_toan");
        buttonXacNhanThanhToan.setAttribute("type", "button");

        divButtonContent.appendChild(buttonXacNhanThanhToan);
        divButtonContainer.appendChild(divButtonEmpty);
        divButtonContainer.appendChild(divButtonContent);

        divContainer.appendChild(divButtonContainer);

        return divContainer;
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
            $('#account_name').attr("href", "/admin.html");
        }
    } else {
        $("#login_button_li").css("display", "");
        $("#login_account_li").css("display", "none");
        $("#logout_account_li").css("display", "none");
        $("#mycart").css("display", "none");
    }
}



// -----------------------------Xử lý nghiệp vụ ------------------------------

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

function getListHoaDon() {

    var $divItem = $("#danh_sach_don_hang").children().children().first().next().next();
    var products = [];

    while (1) {
        var id = $divItem.attr("id");
        if (id == undefined) {
            break;
        }
        var $childI = $divItem.children().first();
        var name = $childI.next().text();
        var slt = $childI.next().next().text();
        var slm = $childI.next().next().next().children().val();
        var don_gia = $childI.next().next().next().next().text();

        var product = {};
        product.id = id;
        product.name = name;
        product.slt = slt;
        product.slm = slm;
        product.don_gia = don_gia;
        if (slm != 0) {
            products.push(product);
        }
        $divItem = $divItem.next();
    }
    return products;
}

function getTongTien(products) {
    var tong_tien = 0;
    for (var i = 0; i < products.length; i++) {
        tong_tien += (products[i].slm * products[i].don_gia);
    }
    return tong_tien;
}

// -----------------------------Thực hiện đọc/ghi dữ liệu


// Connection

function LuuThongTinDonHang() {
    var currentSession = localStorage.getItem("sessionID");
    var ten_nguoi_mua = $("#ten_nguoi_mua").val();
    var so_dien_thoai = $("#dien_thoai").val();
    var dia_chi = $("#dia_chi").val();

    if (ten_nguoi_mua == "" || so_dien_thoai == "" || dia_chi == "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    var tong_tien = $("#tong_tien_val").text();
    if (tong_tien == 0) {
        alert("Đơn hàng rỗng!");
        return;
    }

    var Xu_ly_HTTP = new XMLHttpRequest();
    var linkRequest = host + "/luuThongTinDonHang";
    Xu_ly_HTTP.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var objData = JSON.parse(this.responseText);
            console.log(objData);
            if(objData.success){
                localStorage.removeItem("orders");
                alert("Lưu đơn hàng thành công!");
                $("#danh_sach_don_hang").html("");
                loadDanhSachPhone();
            }
            
        }
    };

    var don_hang = {};
    var products = getListHoaDon(); 
    don_hang.ten_nguoi_mua = ten_nguoi_mua;
    don_hang.dia_chi = dia_chi;
    don_hang.so_dien_thoai = so_dien_thoai;
    don_hang.tong_tien = tong_tien;
    don_hang.products = products;

    Xu_ly_HTTP.open("POST", linkRequest, true);
    Xu_ly_HTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    Xu_ly_HTTP.setRequestHeader("session_user", currentSession);
    Xu_ly_HTTP.send(JSON.stringify(don_hang));

}

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
                    loadDanhSachPhone();
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
                        if (!objData.error) {
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
                            localStorage.removeItem("sessionID");
                            localStorage.removeItem("type");
                            localStorage.removeItem("orders");
                            Cap_nhat_The_hien_Theo_Loai_Nguoi_dung(0);
                            loadDanhSachPhone();
                        }
                    } else {
                        Cap_nhat_The_hien_Theo_Loai_Nguoi_dung(0);
                        localStorage.removeItem("sessionID");
                        localStorage.removeItem("type");
                        localStorage.removeItem("orders");
                        loadDanhSachPhone();
                        alert('Sorry! No Web Storage support..');
                    }
                }
            };
            Xu_ly_HTTP.open("GET", linkRequest, true);
            Xu_ly_HTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            Xu_ly_HTTP.setRequestHeader("session_user", currentSession);
            Xu_ly_HTTP.send();
        } else {
            localStorage.removeItem("sessionID");
            localStorage.removeItem("type");
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


