


function showIcon() {
    let quanInCart = localStorage.getItem("itemNum");
    let numShow = document.getElementById("numShow")
    numShow.innerHTML = quanInCart;
}

function setDetail(event) {
    let dishId = event.target.id;
    // console.log(dishId)
    localStorage.setItem("detailId", dishId);
    // the order of the parameters matters
    window.open("detail.html", "detail", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400", "_blank")
    // setInterval(()=>console.log(xmlhttp.readyState),1000);   
}


function showDetail() {
    let detailId = localStorage.getItem("detailId");
    let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    console.log(xmlhttp);
    let theUrl = "dish.json";
    xmlhttp.open("GET", theUrl);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = this.responseText;
            let data0 = JSON.parse(data);
            let dishDetail = document.createElement('p');
            dishDetail.innerHTML = data0[detailId].name;
            document.body.appendChild(dishDetail);
        }

    }
}




// To show the shopping cart content 
function showCart() {
    console.log("reload");
    let showStore = localStorage.getItem("cartStore");
    let showList = JSON.parse(showStore);
    let itemNum = localStorage.getItem("itemNum");
    console.log(showList);
    console.log(itemNum);
    let cartContainer = document.getElementById('cartContainer');
    console.log(cartContainer);
    let subTotalPrice = document.getElementById("subTotalValue");
    let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    console.log(xmlhttp);
    let theUrl = "../scripts/menu.json";
    xmlhttp.open("GET", theUrl);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            console.log("fetch well");
            let data = this.responseText;
            let data1 = JSON.parse(data);
            console.log(data1);
            let data0 = [];
            for (let key in data1) {
                let temList = data1[key];
                for (let n in temList) {
                    data0.push(temList[n])
                }

            }
            console.log(data0)

            let subPrice = 0;
            console.log(data0);

            var table = document.getElementById("myTable");

            for (let i = 0; i < showList.length; i++) {
                let itemIndex = parseInt(showList[i].id) - 1;
                var row = table.insertRow(i + 1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                cell1.innerHTML = ("<img class='itemImg' src='" + data0[itemIndex].url + "'alt=''/>");
                cell1.style = "width:20%";
                cell2.innerHTML = ("<p style='margin-top:10px'>" + data0[itemIndex].name + "</p> <div class ='control'> \
            <div class='quantityControl'> <span class='addBnt' onclick='addNum("+ i + ")'>^</span> <input class='quanInput' type='text' size='4' value=" + showList[i].quantity + "> <span class ='subBnt' onclick='subNum(" + i + ")'>v</span> </div>\
            <button class='deletBnt' onclick='deletNum("+ i + ")'>Delete</button> </div>");
                cell2 .style = "width:40%;padding-left:5%;font-size:16px;"
                let price = data0[itemIndex].price * showList[i].quantity;
                cell3.innerHTML = ("<span>" + price + "</span>")
                cell3.className = "price";
                console.log(cell3.className);
                cell3.style = "text-align: center; font-size:18px";
                subPrice += price;
            }

            let cartdisp = document.getElementById("cartNum");
            let cartdisp1 = document.getElementById("cartNum1");
            console.log(cartdisp);
            cartdisp1.innerHTML = itemNum;
            cartdisp.innerHTML = itemNum;
            subTotalPrice.innerHTML = `Subtotal(${itemNum} item): $${subPrice.toFixed(2)}`;
            localStorage.setItem("subTotal", subPrice);
        }
    }
}


// item quantity increase method
function addNum(j) {
    let showStore = localStorage.getItem("cartStore");
    let showList = JSON.parse(showStore);
    let currentQun = parseInt(showList[j].quantity);
    console.log("per", document.getElementsByClassName("price")[j].textContent);
    let perPrice = document.getElementsByClassName("price")[j].textContent / currentQun;

    let newQun = parseInt(currentQun) + 1;
    document.getElementsByClassName("quanInput")[j].value = newQun;
    showList[j].quantity++;
    document.getElementsByClassName("price")[j].textContent = (showList[j].quantity * perPrice).toFixed(2);
    localStorage.setItem("cartStore", JSON.stringify(showList));
    let itemNum = localStorage.getItem("itemNum");
    itemNum++;
    console.log(itemNum);
    localStorage.setItem("itemNum", itemNum);
    calSubPrice()

}


// item quantity decrease method
function subNum(j) {
    let showStore = localStorage.getItem("cartStore");
    let showList = JSON.parse(showStore);
    let itemNum = localStorage.getItem("itemNum");
    let currentQun = parseInt(showList[j].quantity)
    let perPrice = parseFloat(document.getElementsByClassName("price")[j].textContent) / currentQun;
    let newQun = parseInt(currentQun) - 1;
    if (newQun !== 0) {
        document.getElementsByClassName("quanInput")[j].value = newQun;
        showList[j].quantity--;
        
        document.getElementsByClassName("price")[j].textContent = (showList[j].quantity * perPrice).toFixed(2);
    } else {

        showList.splice(j, 1);
        document.getElementById("myTable").deleteRow(j + 1); 

    }
    itemNum--;
    localStorage.setItem("cartStore", JSON.stringify(showList));
    localStorage.setItem("itemNum", itemNum);
    // location.replace('cart.html'); 
    // location.reload();
    calSubPrice()

}

// delete item method
function deletNum(j) {
    console.log("delete")
    let showStore = localStorage.getItem("cartStore");
    let showList = JSON.parse(showStore);
    let itemNum = localStorage.getItem("itemNum");
    console.log(itemNum);
    console.log(showList[j].quantity)
    itemNum -= parseInt(showList[j].quantity);
    showList.splice(j, 1);
    localStorage.setItem("cartStore", JSON.stringify(showList));
    localStorage.setItem("itemNum", itemNum);
    document.getElementById("myTable").deleteRow(j + 1);
    calSubPrice()
}

// show the price result after the quantity change
function calSubPrice() {
    let subTotalPrice = document.getElementById("subTotalValue");
    let cartdisp = document.getElementById("cartNum");
    let cartdisp1 = document.getElementById("cartNum1");
    let itemNum = localStorage.getItem("itemNum");
    let priceList = document.getElementsByClassName("price")
    console.log(priceList);
    let subPrice = 0;
    for (let i = 0; i < priceList.length; i++) {
        subPrice += parseFloat(priceList[i].textContent);

    }
    cartdisp1.innerHTML = itemNum;
    cartdisp.innerHTML = itemNum;
    subTotalPrice.innerHTML = `Subtotal(${itemNum} item): $${subPrice.toFixed(2)}`;
    localStorage.setItem("subTotal", subPrice);
}
