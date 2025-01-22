let flyingCardCount = 0;

document.getElementById('horizontalCard').addEventListener('click', function () {
    const cardRow = document.getElementById('cardRow');
    const flyingCards = document.querySelectorAll('.flying-card');

    if (!cardRow.classList.contains('show')) {
        cardRow.classList.add('show');
        window.scrollTo({
            top: window.scrollY + window.innerHeight,
            behavior: 'smooth'
        });

        setTimeout(() => {
            flyingCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('show');
                    flyingCardCount++;

                    // Увеличиваем громкость в момент вылета каждой карты
                    backgroundMusic.volume = 1; 
                    setTimeout(() => {
                        backgroundMusic.volume = 0.2; 
                    }, 3000); 

                    if (flyingCardCount === flyingCards.length) {
                        setTimeout(() => {
                            const button = document.querySelector('.but');
                            button.style.display = 'block';

                            const buttonPosition = button.getBoundingClientRect().top + window.scrollY;
                            window.scrollTo({
                                top: buttonPosition,
                                behavior: 'smooth'
                            });
                        }, 1000);
                    }
                }, index * 900); 
            });
        }, 1000); 
    }
});

let isWindowOpen = false;

function typeText(element, text, speed, callback) {
    let index = 0;
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    element.appendChild(cursor);

    function type() {
        if (index < text.length) {
            element.insertBefore(document.createTextNode(text.charAt(index)), cursor);
            index++;
            setTimeout(type, speed);
        } else {
            element.removeChild(cursor);
            if (callback) callback();
        }
    }
    type();
}

function toggleWindow() {
    const windowImage = document.getElementById('window');
    const windowText = document.getElementById('windowText');
    const typedTextElement1 = document.getElementById('typedText1');
    const typedTextElement2 = document.getElementById('typedText2');

    if (isWindowOpen) return;

    const isOpen = windowImage.style.display === 'block';

    if (isOpen) {
        windowImage.style.display = 'none';
        windowText.style.display = 'none';
    } else {
        windowImage.style.display = 'block';
        windowText.style.display = 'block';

        typedTextElement1.textContent = '';
        typedTextElement2.textContent = '';

        const text1 = "Ну, смотри, всё просто: ты уже знаешь, что нужно делать. И если ещё не знаешь, то карты тебе точно не помогут. Знаешь, что так не будет работать? Да, мы все знаем. Ты не станешь успешным, если будешь сидеть и надеяться, что карты сейчас всё за тебя решат. Пока ты будешь думать, что онлайн расклад — это решение всех проблем, твоя жизнь просто начнёт смеяться с тебя.";
        const text2 = "Завязывай страдать фигнёй, хватит сидеть с телефоном и ожидать чудо. Вставай, делай, а карты пусть отдыхают!";
        setTimeout(() => {
            typeText(typedTextElement1, text1, 100, () => {
                typeText(typedTextElement2, text2, 100, () => {
                });
            });
        }, 1000);
    }

    isWindowOpen = true;

    const windowPosition = windowImage.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
        top: windowPosition,
        behavior: 'smooth'
    });
}



function selectRandom() {
    let lastSetIndex = localStorage.getItem('lastCardSetIndex');

    const indices = cardSets.map((_, index) => index);
    if (lastSetIndex !== null) {
        indices.splice(lastSetIndex, 1);
    }

    const shuffledIndices = indices.sort(() => Math.random() - 0.5);

    const randomIndex = shuffledIndices[0];

    localStorage.setItem('lastCardSetIndex', randomIndex);

    return cardSets[randomIndex];
}

function displayRandomCards() {
    const randomCards = selectRandom();

    const card1 = document.getElementById("card1");
    const card2 = document.getElementById("card2");
    const card3 = document.getElementById("card3");

    card1.src = randomCards[0];
    card2.src = randomCards[1];
    card3.src = randomCards[2];
    console.log("Загруженные изображения:", randomCards);
}

const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

backgroundMusic.volume = 0.2;

const playMusic = () => {
    backgroundMusic.play().catch(error => {
        console.error;
    });
};

const stopMusic = () => {
    backgroundMusic.pause();
};

let isMusicPlaying = false;

musicButton.addEventListener('click', () => {
    if (isMusicPlaying) {
        stopMusic();
        musicButton.textContent;
    } else {
        playMusic();
        musicButton.textContent;
    }
    isMusicPlaying = !isMusicPlaying;
});

window.onload = displayRandomCards;
