//Phone Checker
const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneSpan = document.querySelector('#phone_result');

const reqExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.addEventListener('click', ()=>{
    if (reqExp.test(phoneInput.value)){
        phoneSpan.innerHTML = 'This number is True';
        phoneSpan.style.color = 'green';
    }else {
        phoneSpan.innerHTML = 'This number is False';
        phoneSpan.style.color = 'red';
    }
});

document.getElementById('btn-convert').addEventListener('click', function() {
    var somValue = document.getElementById('som').value;
    var usdValue = document.getElementById('usd').value;
    var eurValue = document.getElementById('eur').value;


    var somInput= document.getElementById('som');
    var usdInput = document.getElementById('usd');
    var eurInput = document.getElementById('eur');


    var som = parseFloat(somValue);
    var usd = parseFloat(usdValue);
    var eur = parseFloat(eurValue);

    

    var counter = 0;
    let convertError = document.getElementById('convertError');
    if (!isNaN(som)) {
        counter++;
    } if (!isNaN(usd)) {
        counter++;
    } if(!isNaN(eur)){
        counter++;
    }
    if (counter === 0) {
        convertError.textContent = "Введите одну валюту!";
    } else if (counter != 1) {
        convertError.textContent = "Введите только одну валюту!";
    } else if (counter === 1){
        if (!isNaN(som)) {
            const result = convertFromSom(som);
            usdInput.value = result.usd;
            eurInput.value = result.eur; 
        } else if (!isNaN(usd)) {
            const result = convertFromUsd(usd);
            somInput.value = result.som;
            eurInput.value = result.eur;
        } else if(!isNaN(eur)) {
            const result = convertFromEur(eur) 
            somInput.value = result.som;
            usdInput.value = result.usd;
            }
        }
    }
);

function convertFromSom(som) {
    let usd = som * 0.011;
    let eur = som * 0.010;
    return {usd, eur};
}
function convertFromUsd(usd) {
    let som = usd * 89;
    let eur = usd * 0.92;
    return {som, eur};
}
function convertFromEur(eur) {
    let som = eur * 97;
    let usd = eur * 1.09;
    return {som, usd};
}




const slides = document.querySelectorAll('.slide')
const next = document.querySelector('#btn-next')
const prev = document.querySelector('#btn-prev')
let index = 0

const hideSlide = () => {
    slides.forEach((slide) => {
        slide.style.opacity = 0
        slide.classList.remove('active_slide')
    })
}
const showSlide = (i = 0) => {
    slides[i].style.opacity = 1
    slides[i].classList.add('active_slide')
}

hideSlide()
showSlide(index)


const autoSlider = (i = 0) => {
    setInterval(() => {
        i++
        if (i > slides.length - 1) {
            i = 0
        }
        hideSlide()
        showSlide(i)
    }, 10000)
}

next.onclick = () => {
    index < slides.length - 1 ? index++ : index = 0
    hideSlide()
    showSlide(index)
}

prev.onclick = () => {
    index > 0 ? index-- : index = slides.length - 1
    hideSlide()
    showSlide(index)
}

autoSlider(index)