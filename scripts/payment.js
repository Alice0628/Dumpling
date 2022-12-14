'use strict';

function takeout() {
    document.getElementById('tkt_dlv').innerHTML =
        ('<br/>\
        <form id="take_out">\
        <label for="input">Choose your pick-up time: </label>\
        <select type="select" id="pickup" required>\
            <option value="0">Approximately in:</option>\
            <option value="1">30 mins</option>\
            <option value="2">45 mins</option>\
            <option value="3">60 mins</option>\
        </select>\
        <br />\
        <label for="pickup">Name: </label>\
        <input type="text" id="pickup" >\
            <label for="pickup">Phone: </label>\
            <input type="tel" id="pickup" maxlength="10" pattern="[0-9]{10}">\
    <div>\
        <button id="btn">Next</button>\
        <button id="btn" type="button">Cancel</button>\
    </div>\
    </form>')
}

function delivery() {
    document.getElementById('tkt_dlv').innerHTML =
        ('<br/>\
        <form id="delivery">\
            <table>\
                <tr>\
                    <td colspan="6">\
                        <label for="input">Choose your delivery time: </label>\
                        <select type="select" id="delivery_time" required>\
                            <option value="0">Approximately delivered in:</option>\
                            <option value="1">30 mins</option>\
                            <option value="2">45 mins</option>\
                            <option value="3">60 mins</option>\
                        </select>\
                    </td>\
                </tr>\
                <tr>\
                    <td>Fisrt Name</td>\
                    <td colspan="2">\
                        <input type="text" id="customer" >\
                    </td>\
                    <td>Last Name</td>\
                    <td colspan="2">\
                        <input type="text" id="customer" >\
                    </td>\
                </tr>\
                <tr>\
                    <td>Phone</td>\
                    <td colspan="2">\
                        <input type="tel" id="customer" maxlength="10" pattern="[0-9]{10}">\
                    </td>\
                    <td>Email</td>\
                    <td colspan="2">\
                        <input type="email" id="customer" placeholder="name@example.com">\
                    </td>\
                </tr>\
                <tr>\
                    <td>Address</td>\
                    <td colspan="2"><input type="text" size="max"></td>\
                    <td>City</td>\
                    <td colspan="2"><input type="text"></td>\
                </tr>\
                <tr>\
                    <td>Province</td>\
                    <td colspan="2"><input type="text" maxlength="2"></td>\
                    <td>Postal Code</td>\
                    <td colspan="2"><input type="text" maxlength="6" pattern="^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$"></td>\
                </tr>\
                <tr>\
                    <td>Requests</td>\
                    <td colspan="5"><textarea placeholder="Leave your buzzcode or other comments HERE."></textarea>\
                    </td>\
                </tr>\
            </table>\
            <div>\
                <button id="btn">Next</button>\
                <button id="btn" type="button">Cancel</button>\
            </div>\
        </form>')
}

// Validate Part -> Card Info
function validateCard() {
    let cardnum = document.getElementById("cardnum");
    let expiredate = document.getElementById("expiredate");
    let nameoncard = document.getElementById("nameoncard");
    let cvv = document.getElementById("cvv");

    if (cardnum.value.length !== 16) {
        alert("Please enter correct Card Number");
        cardnum.focus();
        cardnum.style.background = "yellow";
        expiredate.style.background = "white";
        nameoncard.style.background = "white";
        cvv.style.background = "white";
        return false;
    }
    if (expiredate.value.length !== 4) {
        alert("Please enter correct Expire Date");
        expiredate.focus();
        cardnum.style.background = "white";
        expiredate.style.background = "yellow";
        nameoncard.style.background = "white";
        cvv.style.background = "white";
        return false;
    }
    if (nameoncard.value.length === 0) {
        alert("Please enter your Name on card");
        nameoncard.focus();
        cardnum.style.background = "white";
        expiredate.style.background = "white";
        nameoncard.style.background = "yellow";
        cvv.style.background = "white";
        return false;
    }
    if (cvv.value.length !== 3) {
        alert("Please enter correct CVV");
        cvv.focus();
        cardnum.style.background = "white";
        expiredate.style.background = "white";
        nameoncard.style.background = "white";
        cvv.style.background = "yellow";
        return false;
    }
}

// jQuery toggle
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}



//  should get value from localStorage according to the orderID
function orderedDish() {
    var subtotal = document.getElementById('subtotal').innerHTML;
    document.getElementById('subtotal').innerHTML = '$' + subtotal;
    var tax = 0.15 * subtotal;
    document.getElementById('tax').innerHTML = '$' + tax.toFixed(2);
    var dlvfee = 3;
    document.getElementById('dlvfee').innerHTML = '$' + dlvfee.toFixed(2);
    var total = parseFloat(subtotal) + parseFloat(tax) + parseFloat(dlvfee);
    document.getElementById('total').innerHTML = '$' + total.toFixed(2);
}

