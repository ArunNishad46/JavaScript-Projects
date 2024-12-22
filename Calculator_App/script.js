let buttons = document.querySelector(".buttons");
let btn = document.querySelectorAll("span");
let value = document.querySelector("#value");
let toggleBtn = document.querySelector(".toggleBtn");
let body = document.querySelector("body");

toggleBtn.addEventListener('click', function(){
    if(toggleBtn.textContent.includes("Dark")){
        body.classList = "dark";
        toggleBtn.textContent = "Light";
    }else{
        body.classList = "";
        toggleBtn.textContent = "Dark";
    }
});

btn.forEach( btn => {
    btn.onclick = () => {
        if(btn.innerHTML == '='){
            value.innerHTML = eval(value.innerHTML);
        }else{
            if(btn.innerHTML == 'Clear'){
                value.innerHTML = "";
            }else{
                value.innerHTML += btn.innerHTML;
            }
        }
    }
});