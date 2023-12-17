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




const tabsContentCards = document.querySelectorAll('.tab_content_block')
const tabsItems = document.querySelectorAll('.tab_content_item')
const tabsItemsParents = document.querySelector('.tab_content_items')

const hightTabsContentCards = () => {
    tabsContentCards.forEach((tabContentCard) => {
        tabContentCard.style.display = 'none'
    })
    tabsItems.forEach((tabItem) => {
        tabItem.classList.remove('tab_content_item_active')
    })
}

const showTabsContentCards = (indexElement = 0) => {
    tabsContentCards[indexElement].style.display = 'block'
    tabsItems[indexElement].classList.add('tab_content_item_active')
}

hightTabsContentCards()
showTabsContentCards()

tabsItemsParents.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabsItems.forEach((tabItem, tabItemIndex) => {
            if (event.target === tabItem) {
                hightTabsContentCards()
                showTabsContentCards(tabItemIndex)
            }
        })
    }
}

let currentIndex = 0; 
let intervalId; 

const startAutoSlider = () => {
    intervalId = setInterval(() => {
        hightTabsContentCards();
        showTabsContentCards(currentIndex);
        currentIndex = (currentIndex + 1) % tabsItems.length; 
    }, 3000); 
};

startAutoSlider();

tabsItemsParents.onclick = (event) => {
    clearInterval(intervalId); 
    if (event.target.classList.contains('tab_content_item')) {
        tabsItems.forEach((tabItem, tabItemIndex) => {
            if (event.target === tabItem) {
                hightTabsContentCards();
                showTabsContentCards(tabItemIndex);
                currentIndex = tabItemIndex; 
                startAutoSlider(); 
            }
        });
    }
};




const cityNameInput = document.querySelector('.cityName'),
    city = document.querySelector('.city'),
    temp = document.querySelector('.temp')

const WEATHER_API = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'e417df62e04d3b1b111abeab19cea714'

cityNameInput.oninput = async (event) => {
    try {
        const response = await fetch(`${WEATHER_API}?q=${event.target.value}&appid=${API_KEY}`)
        const data = await response.json()
        city.innerHTML = data.name ? data.name : 'Город не найден...'
        temp.innerHTML = data?.main?.temp ? Math.round(data?.main?.temp - 273) + "&deg;C" : '...'
    } catch (e){
        console.log(e)
    }

}






//
const card = document.querySelector('.card');
const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');

let count = 1;
const totalCards = 200;

// Функция для получения данных о карточке
// Функция для получения данных о карточке
async function getCardData(cardNumber) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${cardNumber}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Функция обновления карточки с данными
function updateCard(cardData) {
    card.innerHTML = `
        <p>${cardData.title}</p>
        <p style="color: ${cardData.completed ? 'green' : 'yellow'}">${cardData.completed}</p>
        <span>${cardData.id}</span>
    `;
}

// Функция обработки кнопки Prev
async function showPrevCard() {
    count = (count === 1) ? totalCards : count - 1;
    const data = await getCardData(count);
    if (data) {
        updateCard(data);
    }
}

// Функция обработки кнопки Next
async function showNextCard() {
    count = (count === totalCards) ? 1 : count + 1;
    const data = await getCardData(count);
    if (data) {
        updateCard(data);
    }
}

// Показать первую карточку при загрузке страницы
window.addEventListener('DOMContentLoaded', async () => {
    const initialCardData = await getCardData(count);
    if (initialCardData) {
        updateCard(initialCardData);
    }
});


// Обработчики событий для кнопок prev и next
btnPrev.addEventListener('click', showPrevCard);
btnNext.addEventListener('click', showNextCard);


//HomeWork 6.2
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Ошибка при запросе:', error));
