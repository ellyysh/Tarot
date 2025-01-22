const gameContainer = document.querySelector(".container");
const userResult = document.querySelector(".user_result img");
const botResult = document.querySelector(".bot_result img");
const result = document.querySelector(".result");
const optionImages = document.querySelectorAll(".option_image");

//ИГРА НЕ РАБОТАЕТ
const botImages = [
    "{{ url_for('static', filename='img/rock.png') }}",
    "{{ url_for('static', filename='img/paper.png') }}",
    "{{ url_for('static', filename='img/scissors.png') }}"
];
const outcomes = {
  RR: "Ничья",
  RP: "Таролог",
  RS: "Ты",
  PP: "Ничья",
  PR: "Ты",
  PS: "Таролог",
  SS: "Ничья",
  SR: "Таролог",
  SP: "Ты"
};

function handleOptionClick(event) {
  const clickedImage = event.currentTarget;
  const clickedIndex = Array.from(optionImages).indexOf(clickedImage);


  userResult.src = botResult.src = "../img/rock.png";
  result.textContent = "Подожди..";


  optionImages.forEach((image, index) => {
    image.classList.toggle("active", index === clickedIndex);
  });

  gameContainer.classList.add("start");

  setTimeout(() => {
    gameContainer.classList.remove("start");

    const userImageSrc = clickedImage.querySelector("img").src;
    userResult.src = userImageSrc;

    const randomNumber = Math.floor(Math.random() * botImages.length);
    const botImageSrc = botImages[randomNumber];
    botResult.src = botImageSrc;


    const userValue = ["R", "P", "S"][clickedIndex];
    const botValue = ["R", "P", "S"][randomNumber];
    const outcomeKey = userValue + botValue;
    const outcome = outcomes[outcomeKey] || "Unknown";


    result.textContent = userValue === botValue ? "Ничья" : `${outcome} победил!`;
  }, 2500);
}


optionImages.forEach(image => {
  image.addEventListener("click", handleOptionClick);
});
