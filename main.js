// elements in html
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCate = document.getElementById("productCate");
var productDesc = document.getElementById("productDesc");
var productImg = document.getElementById("productImg");
var productSearch = document.getElementById("productSearch");
var toggler = document.getElementById("toggler");
var deleteAllBtn = document.getElementById("deleteAll");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var myIndex ;
if (localStorage.getItem("theme") == "dark") {
  document.body.classList.add("bg-dark");
  toggler.classList.add("text-white");
} else {
}

if (JSON.parse(localStorage.getItem("productList")).length == 0) {
  deleteAllBtn.classList.add("d-none");
}

deleteAllBtn.addEventListener("click", function () {
  deleteAllProduct();
  saveToLocalStorage(productList);
  displayProduct();
});

function deleteAllProduct() {
  productList.splice(0);
  deleteAllBtn.remove();
}

// change background
function changeBg() {
  document.body.classList.toggle("bg-dark");
  if (document.body.classList.contains("bg-dark")) {
    localStorage.setItem("theme", "dark");
    toggler.classList.add("text-white");
  } else {
    localStorage.setItem("theme", "light");
    toggler.classList.remove("text-white");
  }
}

toggler.addEventListener("click", function () {
  changeBg();
});

// array of product
var productList = [];

if (localStorage.getItem("productList")) {
  productList = JSON.parse(localStorage.getItem("productList"));
  displayProduct();
} else {
  productList = [];
}

// add product to productList
function addToCart() {
  if (
    productCate.classList.contains("is-valid") &&
    productName.classList.contains("is-valid") &&
    productDesc.classList.contains("is-valid") &&
    productPrice.classList.contains("is-valid")
  ) {
    var product = {
      code: productName.value,
      price: productPrice.value,
      category: productCate.value,
      dec: productDesc.value,
      image: productImg.files[0]?.name,
    };

    productList.push(product);
    saveToLocalStorage(productList);
    displayProduct();
    deleteAllBtn.classList.remove("d-none");
    deleteAllBtn.classList.add("d-block");
    console.log(addBtn.getAttribute("disabled"));
    addBtn.removeAttribute("disabled");
    console.log(productList);
    clearInput();
  } else {
  }
}

// save to localStorage
function saveToLocalStorage(item) {
  localStorage.setItem("productList", JSON.stringify(item));
}

// clear inputs value
function clearInput() {
  productName.value = "";
  productPrice.value = "";
  productCate.value = "";
  productDesc.value = "";
  productImg.value = "";
}

// display product
function displayProduct() {
  var cartona = "";
  for (var i = 0; i < productList.length; i++) {
    cartona += `
   <div class="col-md-4">
          <div class="inner">
            <img src="/images/${productList[i].image}" class="w-100" alt="" />
          <div class="inner-content">
              <h2 class="h5 mb-2">
              <span class="text-success fw-semibold">Name:</span><span> ${productList[i].code}</span>
            </h2>

            <p class="fs-5 mb-2">
              <span class="text-success">price:</span><span> ${productList[i].price}</span> EGP
            </p>

                <p class="fs-5 mb-2 mt-0">
              <span class="text-success">Desc:</span> <span> ${productList[i].dec}</span>
            </p>

            <p class="fs-5 mb-2 mt-0">
              <span class="text-success">Catetory:</span>  <span> ${productList[i].category}</span>
            </p>
            <button class="btn btn-outline-danger fs-5 w-100 mb-2" onclick="deleteProduct(${i})">Delete <i class="fa-solid fa-trash"></i></button>
            <button class="btn btn-outline-warning fs-5 w-100" onclick="setToUpdate(${i})">Update <i class="fa-solid fa-pen"></i></button>
          </div>
          </div>
        </div>
`;
  }

  document.querySelector(".row").innerHTML = cartona;
}

// delete product
function deleteProduct(deletedIndex) {
  productList.splice(deletedIndex, 1);
  saveToLocalStorage(productList);
  displayProduct();
}

// search

function search() {
  var word = productSearch.value.trim();
  var cartona = "";
  for (var i = 0; i < productList.length; i++) {
    if (
      productList[i].code.toLowerCase().includes(word.toLowerCase()) &&
      word != ""
    ) {
      cartona += `
   <div class="col-md-4">
          <div class="inner">
            <img src="/images/${productList[i].image}" class="w-100" alt="" />
          <div class="inner-content">
              <h2 class="h5 mb-2">
              <span class="text-success fw-semibold">Name:</span><span> ${productList[i].code}</span>
            </h2>

            <p class="fs-5 mb-2">
              <span class="text-success fw-semibold">Price:</span><span> ${productList[i].price} EGP</span>
            </p>

                <p class="fs-5 mb-2 mt-0">
                          <span class="text-success fw-semibold">Desc:</span><span> ${productList[i].dec}</span>

            </p>

            <p class="fs-5 mb-2 mt-0">
              <span class="text-success fw-semibold">Category:</span><span> ${productList[i].category}</span>
            </p>
            <button class="btn btn-outline-danger fs-5 w-100 mb-2" onclick="deleteProduct(${i})">Delete <i class="fa-solid fa-trash"></i></button>
            <button class="btn btn-outline-warning fs-5 w-100">Update <i class="fa-solid fa-pen"></i></button>
          </div>
          </div>
        </div>
`;
    }
  }

  if (cartona === "") {
    document.querySelector(
      ".row"
    ).innerHTML = `<h2 class="bg-black text-white text-center rounded p-3">Not Found Data</h2>`;
  } else {
    document.querySelector(".row").innerHTML = cartona;
  }
}

// validate inputs
function validateInputs(element) {
  var elementId = element.id;
  var elemenetValue = element.value;
  var alertError = document.querySelector(`#${elementId} + .alert-danger`);

  var regex = {
    productName: /^[A-Z][a-z]{3,10}$/,
    productPrice: /^[1-9][0-9]{1,10}$/,
    productCate: /^(tv|mobile|screens|tablets)$/i,
    productDesc: /^\w{3,}\s{0,}\w{3,}/,
  };

  if (regex[elementId].test(elemenetValue)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    alertError.classList.replace("d-block", "d-none");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    alertError.classList.replace("d-none", "d-block");
    return false;
  }

  if (
    productName.classList.contains("is-valid") &&
    productCate.classList.contains("is-valid") &&
    productDesc.classList.contains("is-valid") &&
    productPrice.classList.contains("is-valid")
  ) {
    console.log("success");
    addBtn.removeAttribute("disabled");
  } else {
    addBtn.setAttribute("disabled", "disabled");
    console.log("error validate");
  }
}

// set to update
function setToUpdate(index) {
  myIndex = index;
  productName.value = productList[index].code;
  productCate.value = productList[index].category;
  productDesc.value = productList[index].dec;
  productPrice.value = productList[index].price;
  updateBtn.classList.remove("d-none");
  addBtn.classList.add("d-none");
  productName.classList.add("is-valid");
  productPrice.classList.add("is-valid");
  productCate.classList.add("is-valid");
  productDesc.classList.add("is-valid");
}


// update product
function updateProduct(){
if(productName.classList.contains("is-valid") && productPrice.classList.contains("is-valid") 
&& productCate.classList.contains("is-valid") && productDesc.classList.contains("is-valid")){
productList[myIndex].code = productName.value;
productList[myIndex].price = productPrice.value;
productList[myIndex].category = productCate.value;
productList[myIndex].dec = productDesc.value;
displayProduct();
saveToLocalStorage(productList);
addBtn.classList.remove("d-none");
updateBtn.classList.add("d-none");
}else{
window.alert("please enter valid data");
}

}


