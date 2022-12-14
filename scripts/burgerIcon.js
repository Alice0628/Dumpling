const burgerIcon = document.getElementById("burgerImg");
burgerIcon.addEventListener('click',navOnOff);
const navUl = document.getElementById("navUl");
let flag = false;
 
function navOnOff(){
    console.log("onofffunciton");
    if (!flag){
        navUl.className = "on";
        flag = true;
    } else {
        navUl.className = "off";
        flag = false;
    }
    console.log(flag);
     
}