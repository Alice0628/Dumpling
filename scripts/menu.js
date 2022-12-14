// steamed dumpling 1-5
$("document").ready(() => {
  let itemNum = localStorage.getItem("itemNum");
  let cartdisp = document.getElementById("cartNum");
  let cartdisp1 = document.getElementById("cartNum1");
  
  if (!itemNum){
    cartdisp1.innerHTML = 0;
    cartdisp.innerHTML = 0;
  }else {
    cartdisp1.innerHTML = itemNum;
    cartdisp.innerHTML = itemNum;
  }
  $.getJSON("../scripts/menu.json", (data) => {
    for (const menuName in data) {
      let menus = data[menuName];

      let menuStr = "";
      let modalStr = "";

      for (const index in menus) {
        let menu = menus[index];

        menuStr +=
          '<p class="menu p-2 ms-3" data-bs-toggle="modal" data-bs-target="#' +
          menu["id"] +
          '">' +
          '<span class="menu-item">' +
          menu["name"] +
          "</span>" +
          "<span>$" +
          menu["price"] +
          "</span></p>";

        modalStr +=
          '<div class="modal fade" id="' +
          menu["id"] +
          '"><div class="modal-dialog modal-dialog-scrollable modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h4>' +
          menu["name"] +
          '</h4><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div><img src="' +
          menu["url"] +
          '" width="100%" alt="steam dumpling" /></div><h5>CA$' +
          menu["price"] +
          '</h5></div><div class="modal-footer justify-content-center"><div class="d-grid"><button type="button" class="btn btn-primary btn-block btn-cart" onclick="addCart(' + menu['id'] + ')">Add To Cart</button></div></div></div></div></div>';

      }

      $("#" + menuName + "-menu").html(menuStr);
      $("#" + menuName + "-modal").html(modalStr);
    }
  });
});
// add the product into shopping cart
function addCart(num) {
  let tem = num.id;
  itemId = tem.slice(1);
  console.log(itemId)
  console.log("addcart");
  let ifSame = false;
  let cartStore = localStorage.getItem("cartStore");
  let itemNum = localStorage.getItem("itemNum");
  let cartList1 = JSON.parse(cartStore);
  console.log("au debut cartList", cartList1);
  console.log("au debut localstrore", cartStore);
  let cartList = [];
  if (!cartStore) {
    console.log("store empty add");
    cartList.push({ "id": itemId, "quantity": 1 });
    console.log(cartList);
    itemNum = 1;
  } else {
    console.log("store not empty");
    cartList = JSON.parse(cartStore);
    console.log(cartList);
    for (let j = 0; j < cartList.length; j++) {
      if (cartList[j].id == itemId) {
        console.log("same");
        cartList[j].quantity++;
        ifSame = true;
        break;
      }
    }
    if (!ifSame) {
      console.log("not same!");
      cartList.push({ "id": itemId, "quantity": 1 });
      console.log(cartList);
    }
    itemNum++;
  }

  console.log(cartList);
  localStorage.setItem("cartStore", JSON.stringify(cartList));
  localStorage.setItem("itemNum", itemNum);

  let cartdisp = document.getElementById("cartNum");
  let cartdisp1 = document.getElementById("cartNum1");
  cartdisp1.innerHTML = itemNum;
  cartdisp.innerHTML = itemNum;

}
