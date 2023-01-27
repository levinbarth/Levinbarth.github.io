# Praktikum bei Jambit
Projekt für das jambit-Praktikum

Counter?

HTML:
<h1 class="counter-display">(..)</h1>
<button class="counter-minus">-</button>
<button class="counter-plus">+</button>

JavaScript:
let counterDisplayElem = document.querySelector('.counter-display');
let counterMinusElem = document.querySelector('.counter-minus');
let counterPlusElem = document.querySelector('.counter-plus');

let count = 0;

updateDisplay();

counterPlusElem.addEventListener("click",()=>{
    count++;
    updateDisplay();
}) ;

counterMinusElem.addEventListener("click",()=>{
    count--;
    updateDisplay();
});

function updateDisplay(){
    counterDisplayElem.innerHTML = count;
}; 