//so luong san pham
let varObj = [1];
let Gia = 1;
let soLuong = 1;
let weight = 0;
const fetchProductDetail = function () {
  //const courseld = window.location.search.split("=")[1]; //co the bo window ,spilt la ham tach chuoi thanh mang
  const courseId = window.location.search.split("=")[1]; //lấy chuổi sau dấu =  trên thanh search
  axios({
    url:
      "https://5f5442d1e5de110016d51e7d.mockapi.io/dataProduct/1/" + courseId,
    method: "GET",
  })
    .then(function (res) {
      fetchAllProduct();
      console.log("response form backend", res.data);
      var product = res.data;
      console.log(product.title);
      renderProduct(res.data);
    })
    .catch(function (err) {
      //console.log(err);
      console.log("nono1");
    });
};

const fetchAllProduct = function () {
  var number = Math.floor(Math.random() * 2) + 1; // random ngẫu nhiên product 1 và 2

  axios({
    url:
      "https://5f5442d1e5de110016d51e7d.mockapi.io/dataProduct/1/product" +
      number,
    method: "GET",
  })
    .then(function (res) {
      console.log("response form backend 2", res.data);

      rendersidlebarProduct(res.data, number);
    })
    .catch(function (err) {
      //console.log(err);
      console.log("nono2");
    });
};
function numberFormat(nStr) {
  nStr += "";
  x = nStr.split(".");
  x1 = x[0];
  x2 = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) x1 = x1.replace(rgx, "$1" + "," + "$2");
  return x1 + x2;
}

fetchProductDetail();
function renderProduct(data) {
  let varPrice = [data.price];
  let priceFormat = numberFormat(data.price);
  let productContent = "";
  let modalContent = "";
  weightAll = [200];
  productContent = `
  <div class="entry-thumbnail col-sm-12 col-lg-6">
  <img alt="" src="${data.image}" />
</div>
<div class="priceProduce col-sm-12 col-lg-6">
  <h3>${data.title}</h3>
  <h4>Giá từ : <span>${priceFormat}</span> VND</h4>
  <p>
  ${data.content}
  </p>
  <h6>Trọng Lượng</h6>
  <button class="draw" onclick="getWeight(100,${data.price})">100gr</button>
  <button class="draw" onclick="getWeight(200,${data.price})">200gr</button>
  <button type="button" class="btn btn-primary"  data-toggle="modal" data-target="#exampleModal">
  Mua Ngay
</button>
</div>
  `;
  // modal content
  modalContent = `
    <div class="modal-header text-center">
    <h5 class="modal-title" id="exampleModalLabel">
      ${data.title}
    </h5>
    <button
      type="button"
      class="close"
      data-dismiss="modal"
      aria-label="Close"
      onclick="closeModal()"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <div class=".Contact__content col-12">
      <h1>Đăng kí mua</h1>
      <div class="contact__list mt-5">
        <form name="form1">
          <input
            id="input__name"
            class="pl-3"
            type="text"
            name="HoTen"
            placeholder="Họ và Tên"
          />
          <span
            class="sp-thongbao"
            id="firstNameError"
          ></span>
          <textarea
            id="input__area"
            class="pl-3 pt-3"
            name="NoiDung"
            id=""
            cols="20"
            rows="10"
            placeholder="Địa chỉ"
          ></textarea>
          <span class="sp-thongbao" id="areaError"></span>
          
          <input
            id="input__email"
            class="pl-3"
            type="email"
            name="email"
            placeholder="email"
          />
          <span
            class="sp-thongbao"
            id="emailError"
          ></span>
          <input
            id="input__phone"
            class="pl-3"
            type="number"
            name="phone"
            placeholder="Sồ điện thoại"
          />
          <span
            class="sp-thongbao"
            id="phoneError"
          ></span>
          <input id="input__reset" type="reset" value = "Nhập lại" />
          <button type="button" class="btnOfCount" id="btn__plus" onclick="changeCountPlus(${varPrice[0]})">+</button>
          <div class="parentIp__count">
          <p style="margin=0;">Số Lượng</p>
          <p id="ip__count">${soLuong}</p>
          </div>
          
          <button type="button" class="btnOfCount" id="btn__minus" onclick="changeCountMinus(${varPrice[0]})">-</button>
          <span
          class="sp-thongbao"
          id="countError"
        ></span>
  
  
  <h5>Trọng lượng:</h5>
  <div class="parentIp__weight">
    <input
            id="input__weight"
            class="pl-3"
            type="number"
            name="weight"
            placeholder="trọng lượng"
            disabled
          />
          <p> gram</p>
          <span
          class="sp-thongbao"
          id="WeightError"
        ></span>
        
  </div>
          <p id="input__price" style="margin: 0">Giá trị: ${priceFormat} VND</p>
          <button
            id="button__submit"
            type="button"
            class="btn"
            onclick="submitClick(${data.price})"
            
          >
            submit
          </button>
        </form>
      </div>
    </div>
  </div>
    `;

  document.getElementById("modaljs").innerHTML = modalContent;
  document.getElementById("productRender").innerHTML = productContent;
}

function rendersidlebarProduct(data, number) {
  var sidlebarContent = "";
  for (let index = 0; index < 4; index++) {
    var productItem = data[index];
    let priceFormat = numberFormat(data[index].price);
    sidlebarContent += `
  <div class="widget_tag_cloud">
  <div class="row media" href="#" >
    <div class="col-sm-4 media_img">
      <img src="${productItem.image}" style="width:90%" alt="yen sao" />
    </div>

    <div class="media-body col-sm-8">
      <h5 class="mt-0">${productItem.title}</h5>
      <p>Giá :${priceFormat} VND</p>
      <button class="" href="#" onclick="pageProductAPI(${number},${
      +index + 1
    })">Xemchi tiet</button>
    </div>
  </div>
</div>
  `;
  }

  document.getElementById("sidebarProductRender").innerHTML = sidlebarContent;
}

// check validation
function submitClick(PriceDefaulte) {
  var ProductName = document.getElementById("exampleModalLabel").innerText;
  var Name = document.getElementById("input__name").value;
  var Address = document.getElementById("input__area").value;
  var Email = document.getElementById("input__email").value;
  var Phone = document.getElementById("input__phone").value;
  var Weight = document.getElementById("input__weight").value;
  var Amount = soLuong;
  var Price = Amount == 1 ? numberFormat(PriceDefaulte) : Gia; // Toán tử 3 ngôi nếu đúng thì thực hiện hàm
  let inFoGuess = {
    Name,
    Address,
    Email,
    Phone,
    Amount,
    Weight,
    Price,
    ProductName,
  };
  console.log(inFoGuess);
  if (checkSubmit(Name, Address, Email, Phone, Weight)) {
    sendData(inFoGuess);
  }
}
// sendData
const sendData = (inFoGuess) => {
  axios
    .post("https://5f5442d1e5de110016d51e7d.mockapi.io/cart", inFoGuess)
    .then((response) => {
      console.log(response);
      alert("thanh cong");
    });
};

// checkvalidationsubmit
let checkSubmit = (Name, Address, Email, Phone, Weight) => {
  var isValid = true;
  isValid &=
    checkRequired(Name, "firstNameError") &&
    checkLenght(Name, "firstNameError", 1, 15) &&
    checkString(Name, "firstNameError");

  isValid &=
    checkRequired(Address, "areaError") &&
    checkLenght(Address, "areaError", 1, 2000);
  isValid &=
    checkRequired(Email, "emailError") &&
    checkLenght(Email, "emailError", 1, 30);
  isValid &=
    checkRequired(Phone, "phoneError") &&
    checkLenght(Phone, "phoneError", 1, 10);
  isValid &=
    checkRequired(Weight, "WeightError") &&
    checkLenght(Weight, "WeightError", 1, 3000);
  return isValid;
};

//-------------close modal click----------------
function closeModal() {
  document.getElementById("input__reset").click();
  document.getElementById("ip__count").innerText = 1;
  document.getElementById("input__price").innerText = 0;
  soLuong = 1;
}
function checkRequired(value, errorId) {
  if (value) {
    document.getElementById(errorId).innerHTML = "";
    return true;
  }
  document.getElementById(errorId).setAttribute("style", "display:block");
  document.getElementById(errorId).innerHTML = "Truong nay bat buoc nhap";
  return false;
}

function checkLenght(value, errorId, min, max) {
  if (value.length < min || value.length > max) {
    document.getElementById(errorId).setAttribute("style", "display:block");
    document.getElementById(
      errorId
    ).innerHTML = `*Do dai phai tu ${min} den ${max}`;
    return false;
  }
  document.getElementById(errorId).innerHTML = "";
  return true;
}

function checkString(value, errorId) {
  const pattern = new RegExp(
    "^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂếẾưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
  );
  if (pattern.test(value)) {
    document.getElementById(errorId).innerHTML = "";
    return true;
  }
  document.getElementById(errorId).setAttribute("style", "display:block");
  document.getElementById(errorId).innerHTML = "Du lieu ko dung dinh dang";
  return false;
}
// end
//Định dạng tiền Việt Nam
function numberFormat(nStr) {
  nStr += "";
  x = nStr.split(".");
  x1 = x[0];
  x2 = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) x1 = x1.replace(rgx, "$1" + "," + "$2");
  return x1 + x2;
}
// scorll ẩn hiện list product
$(document).ready(function () {
  $(window).scroll(function (event) {
    var pos_body = $("html,body").scrollTop();
    // console.log(pos_body);
    if (pos_body < 1990) {
      $(".listProduct").addClass("listProductFixed");
    } else {
      $(".listProduct").removeClass("listProductFixed");
    }
  });
});

function pageProductAPI(key, id) {
  console.log(key);
  window.location.assign("blog.html?key=" + "product" + key + "/" + id);
}
function getWeight(gram, price) {
  document.getElementById("input__weight").value = gram;

  var priceFormat2 =
    gram != 100 ? numberFormat(price * 2) : numberFormat(price);

  document.getElementById("input__price").innerText =
    "Giá trị : " + priceFormat2;
}
function changeCountPlus(price) {
  // Tăng số Lượng
  if (document.getElementById("input__weight").value != 0) {
    document.getElementById("ip__count").innerText >= 20 ? 20 : soLuong++;
    document.getElementById("ip__count").innerText = soLuong;
    // conle.log(soLuong);
    price =
      document.getElementById("input__weight").value == 200 ? price * 2 : price;
    price *= soLuong;
    price = numberFormat(price);
    Gia = price;
    var renderPrice = " Giá: " + price + " VND";
    document.getElementById("input__price").innerHTML = renderPrice;
  }
}
function changeCountMinus(price) {
  //Giảm số Lượng
  document.getElementById("ip__count").innerText == 1 ? 1 : soLuong--;

  document.getElementById("ip__count").innerText = soLuong;
  console.log(soLuong);
  price *= soLuong;
  console.log(price);
  price = numberFormat(price);
  Gia = price;
  var renderPrice = " Giá: " + price + " VND";
  document.getElementById("input__price").innerHTML = renderPrice;
}
