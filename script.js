// 获取按钮元素
const scrollToTopButton = document.getElementById('scrollToTop');
const randomCardButton = document.getElementById('randomCard');
const cardsContainer = document.querySelector('.cards-container');

// 读取info.txt内容并创建卡片
function createCards() {
    fetch('info.txt')
        .then(response => response.text())
        .then(data => {
            const infoArray = data.split('%');
            for (let i = 0; i < infoArray.length; i += 4) {
                const card = document.createElement('div');
                card.classList.add('card');
                const img = document.createElement('img');
                img.src = `img/${infoArray[i+1]}.jpg`;
                img.onerror = function() {
                    this.src = 'img/person.jpg'; // 默认图片
                };
                const name = document.createElement('div');
                name.classList.add('name');
                name.textContent = infoArray[i + 1];
                const intro = document.createElement('div');
                intro.classList.add('intro');
                intro.textContent = infoArray[i + 2];
                const homeIcon = document.createElement('img');
                homeIcon.src = 'img/home.png';
                homeIcon.classList.add('home-icon');
                homeIcon.addEventListener('click', () => {
                    const url = infoArray[i + 3] || 'https://nieyuxin001.github.io';
                    window.open('https://'+url, '_blank');
                });
                card.appendChild(img);
                card.appendChild(name);
                card.appendChild(intro);
                card.appendChild(homeIcon);
                cardsContainer.appendChild(card);
            }
        })
        .catch(error => console.error(error));
}

// 随机选择一个卡片并执行动画效果
function randomizeCard() {
    const randomIndex = Math.floor(Math.random() * cardsContainer.children.length);
    const randomCard = cardsContainer.children[randomIndex];
    randomCard.style.transform = 'scale(1.2)';
    setTimeout(() => {
        randomCard.style.transform = 'scale(1)';
    }, 1000);
}

// 按钮点击事件监听器
scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

randomCardButton.addEventListener('click', () => {
    randomizeCard();
});

// 初始化页面
createCards();