

let startTime, updatedTime, interval;
let running = 0;
let display = document.getElementById("display");
let startPauseBtn = document.getElementById("startPause");
let resetBtn = document.getElementById("reset");
let lapBtn = document.getElementById("lap");
let laps = document.getElementById("laps");

let hours = 0, minutes = 0, seconds = 0, milliseconds = 0;


function formatTime() {
    return (
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds) + "." +
        (milliseconds < 10 ? "0" + milliseconds : milliseconds)
    );
}


function updateDisplay() {
    milliseconds += 1;

    if (milliseconds >= 100) {
        milliseconds = 0;
        seconds += 1;
    }
    if (seconds >= 60) {
        seconds = 0;
        minutes += 1;
    }
    if (minutes >= 60) {
        minutes = 0;
        hours += 1;
    }

    display.textContent = formatTime();
}


function startPauseStopwatch() {
    if (!running) {
        startTime = Date.now() - (updatedTime || 0);
        interval = setInterval(updateDisplay, 10);
        startPauseBtn.textContent = "Pause";
    } else {
        updatedTime = Date.now() - startTime;
        clearInterval(interval);
        startPauseBtn.textContent = "Start";
    }
    running = !running;
}


function resetStopwatch() {
    clearInterval(interval);
    running = 0;
    hours = minutes = seconds = milliseconds = 0;
    updatedTime = 0;
    display.textContent = "00:00:00.00";
    startPauseBtn.textContent = "Start";
    laps.innerHTML = ""; 
}


function lapTime() {
    if (running) {
        let lapItem = document.createElement("li");
        lapItem.textContent = formatTime();
        laps.appendChild(lapItem);
    }
}


startPauseBtn.addEventListener("click", startPauseStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", lapTime);
