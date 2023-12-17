const cardsContainer = document.querySelector('.cards');
const defaultPhoto = "https://pbs.twimg.com/ext_tw_video_thumb/1046830406656577537/pu/img/UgZck6S8Zr04z7yV.jpg";


async function getPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=12');
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

async function renderCards() {
    const posts = await getPosts();
    cardsContainer.innerHTML = '';

    posts.forEach(post => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <img src="${defaultPhoto}" alt="Placeholder Image"> <!-- Здесь можно указать свою ссылку на изображение -->
        <h2>${post.title}</h2>
        <p>${post.body}</p>
    `;
        cardsContainer.appendChild(card);
    });
}

window.addEventListener('DOMContentLoaded', renderCards);
