

const subscribeCheckbox = document.getElementById('subscribe');
const duplicatesContainer = document.getElementById('duplicates');

const duplicateFlags = {
    main: false,
    firstDuplicate: false,
    secondDuplicate: false,
};

function createCheckbox(labelText) {
    const newLabel = document.createElement('label');
    newLabel.classList.add('duplicate');
    newLabel.innerHTML = `
        <input type="checkbox" checked>
        ${labelText}
    `;
    return newLabel;
}

subscribeCheckbox.addEventListener('change', function () {
    if (!this.checked && !duplicateFlags.main) {
        duplicateFlags.main = true;
        const newCheckbox = createCheckbox("Хочу рассылку");
        duplicatesContainer.appendChild(newCheckbox);
        addChangeListener(newCheckbox.querySelector('input'), "Присылайте мне письма");
    }
});

function addChangeListener(checkbox, labelText) {
    checkbox.addEventListener('change', function () {
        if (!this.checked && labelText === "Хочу рассылку" && !duplicateFlags.firstDuplicate) {
            duplicateFlags.firstDuplicate = true;
            const newCheckbox = createCheckbox("Присылайте мне письма");
            duplicatesContainer.appendChild(newCheckbox);
            addChangeListener(newCheckbox.querySelector('input'), "Пожалуйста, присылайте мне письма");
        } else if (!this.checked && labelText === "Присылайте мне письма" && !duplicateFlags.secondDuplicate) {
            duplicateFlags.secondDuplicate = true;
            const newCheckbox = createCheckbox("Пожалуйста, присылайте мне письма");
            duplicatesContainer.appendChild(newCheckbox);
        }
    });
}
const ratingInputs = document.querySelectorAll('.rating input');
const ratingLabels = document.querySelectorAll('.rating label');

ratingInputs.forEach((input, index) => {
    input.addEventListener('change', () => {
        ratingLabels.forEach((label, labelIndex) => {
            if (labelIndex <= index) {
                label.style.color = 'gold'; 
            } else {
                label.style.color = '#ccc';
            }
        });
    });
});

function showModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}

// Показываем модальное окно каждые 30 секунд
setInterval(showModal, 30000);

function closeModal() {
 const modal = document.getElementById("myModal");
modal.style.display = "none";
}

// Начальное отображение окна при загрузке страницы 
window.onload = function() {
    setTimeout(showModal, 1000); // Показываем модальное окно через 1 секунду после загрузки
}

// Функция для определения текущего времени суток
function getTimeOfDay() {
    const hours = new Date().getHours();

    if (hours >= 6 && hours < 12) {
        return "Доброе утро! Самое время узнать прогноз на день";
    } else if (hours >= 12 && hours < 18) {
        return "Добрый день! Что тебя ждет на этой неделе?";
    } else if (hours >= 18 && hours < 24) {
        return "Добрый вечер! Узнай как сделать завтра лучше";
    } else {
        return "Ночь - лучшее время для гаданий";
    }
}

function addGreetingStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .custom-greeting {
            position: fixed;
            bottom: 10px;
            right: 10px;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px;
            font-size: 18px;
            border-radius: 5px;
            z-index: 1000;
            transition: opacity 1s ease-out;
        }
    `;
    document.head.appendChild(style);
}

function showGreeting() {
    const greeting = getTimeOfDay();

    const greetingDiv = document.createElement('div');
    greetingDiv.textContent = greeting;
    greetingDiv.className = 'custom-greeting';
    document.body.appendChild(greetingDiv);

    setTimeout(() => {
        greetingDiv.style.opacity = 0;
    }, 9000); 

    setTimeout(() => {
        greetingDiv.remove();
    }, 10000); 
}

window.addEventListener('load', () => {
    addGreetingStyles();
    showGreeting();
});
const closeButton = document.getElementById('closeButton');
const modalContent = document.querySelector('.modal-content');

closeButton.addEventListener('mouseover', () => {
    setTimeout(() => {
        // Задаем фиксированную ширину для области перемещения
        const modalWidth = 200;
        const modalRect = modalContent.getBoundingClientRect();

        // Ограничиваем область движения по ширине и высоте
        const randomX = Math.random() * (modalWidth - closeButton.offsetWidth);
        const randomY = Math.random() * (modalRect.height - closeButton.offsetHeight);

        // Применяем координаты
        closeButton.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }, 200); 
});

document.getElementById('trigger').addEventListener('click', function () {
    const metaContainer = document.getElementById('meta-container');

    // Показываем контейнер
    metaContainer.classList.add('show');

    // Через 2 секунды скрываем его
    setTimeout(() => {
      metaContainer.classList.remove('show');
    }, 2000); // 2000 миллисекунд = 2 секунды
  });
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