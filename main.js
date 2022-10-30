const hoursSpan = document.querySelector('.hours');
const minutesSpan = document.querySelector('.minutes');
const secondsSpan = document.querySelector('.seconds');

const lapsList = document.querySelector('.laps-list');

const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const resetBtn = document.querySelector('.reset');
const addLapBtn = document.querySelector('.add-lap');
const clearLapListBtn = document.querySelector('.clear-lap-list');

const message = document.querySelector('.message');

let hours = 0;
let minutes = 0;
let seconds = 0;

let lapsArray = [];
let timeDetails = {};

let intervalIndex;

function startTimer() {
    hoursSpan.innerHTML = hours < 10 ? "0" + hours : hours;
    minutesSpan.innerHTML = minutes < 10 ? "0" + minutes : minutes;
    secondsSpan.innerHTML = seconds < 10 ? "0" + seconds : seconds;
    seconds++;
    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }
    if (minutes === 60) {
        hours++;
        minutes = 0;
    }
}

startBtn.addEventListener("click", () => {
    intervalIndex = setInterval(startTimer, 10);
    startBtn.innerHTML = "Start";
    pauseBtn.addEventListener("click", pauseTimer);
});

function pauseTimer() {
    clearInterval(intervalIndex);
    timeDetails = {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
    }
    startBtn.innerHTML = "Continue";
}

function resetTimer() {
    hoursSpan.innerHTML = "00";
    minutesSpan.innerHTML = "00";
    secondsSpan.innerHTML = "00";
    hours = 0;
    minutes = 0;
    seconds = 0;
    startBtn.innerHTML = "Start";
    clearInterval(intervalIndex);
    pauseBtn.removeEventListener("click", pauseTimer);
}

resetBtn.addEventListener("click", resetTimer);

function addLap() {
    if (hours === 0 && minutes === 0 && seconds === 0) {
        alert(`Error! You can't add lap with ${"0" + hours}:${"0" + minutes}:${"0" + seconds} time!!!`)
    } else {
        lapsArray.push(timeDetails);
        const li = document.createElement('li');
        li.setAttribute('class', 'lap');
        const lapTime = `Lap time: ${hours < 10 ? "0" + hours : hours} : ${minutes < 10 ? "0" + minutes : minutes} : ${seconds < 10 ? "0" + seconds : seconds}`;
        li.textContent = lapTime;
        if (lapsArray.length > 5) {
            lapsList.lastChild.remove()
        }
        lapsList.prepend(li);
        message.classList.remove("active");
        clearLapListBtn.classList.add('active');
    }

}

addLapBtn.addEventListener("click", addLap);

function clearLapList() {
    const allLiItems = document.querySelectorAll("li");
    allLiItems.forEach(li => li.remove());
    lapsArray = [];
    clearLapListBtn.classList.remove('active');
    message.classList.add('active');
}

clearLapListBtn.addEventListener("click", clearLapList);