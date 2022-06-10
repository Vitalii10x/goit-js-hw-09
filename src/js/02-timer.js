// Задание 2. Таймер обратного отсчета
// Напиши скрипт таймера, который ведёт обратный отсчет до определенной даты.
// Используй библиотеку flatpickr для того чтобы позволить пользователю кроссбраузерно выбрать конечную дату и время в одном элементе интерфейса. Для того чтобы подключить CSS код библиотеки в проект, необходимо добавить еще один импорт, кроме того который описан в документации.

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('.value[data-days]');
const hoursEl = document.querySelector('.value[data-hours]');
const minutesEl = document.querySelector('.value[data-minutes]');
const secondsEl = document.querySelector('.value[data-seconds]');

startBtn.disabled = true;
startBtn.addEventListener('click', start);

let date;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        date = selectedDates[0];
      
        if (date < new Date()) {
            Notify.failure('Please choose a date in the future');
        } else {
            startBtn.disabled = false;
        }
    },
};

flatpickr('#datetime-picker', options);

function start() {
    countdown();
    timerId = setInterval(countdown, 1000);
}

function countdown() {
    const now = new Date();

    let dates = convertMs(date - now);
    let { days, hours, minutes, seconds } = dates;

    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
    
    const isFinished = Object.keys(dates).every(date => dates[date] === 0);

    if (isFinished) {
        startBtn.disabled = false;

        clearInterval(timerId);
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
    } else {
        startBtn.disabled = true;
    }
};

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

