// Задание 1. Переключатель цветов
// Напиши скрипт, который после нажатия кнопки «Start», раз в секунду меняет цвет фона <body> на случайное значение используя инлайн стиль. При нажатии на кнопку «Stop», изменение цвета фона должно останавливаться.
// Учти, на кнопку «Start» можно нажать бесконечное количество раз. Сделай так, чтобы пока изменение темы запушено, кнопка «Start» была не активна (disabled).


const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let timerId = null;

startBtn.addEventListener("click", onStartBtn);
stopBtn.addEventListener("click", onStopBtn);

function onStartBtn() {
  timerId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
    startBtn.disabled = true;
}

function onStopBtn() {
     clearInterval(timerId);
  startBtn.disabled = false;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
