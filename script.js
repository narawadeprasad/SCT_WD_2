let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCount = 1;

const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const lapBtn = document.getElementById("lap");
const resetBtn = document.getElementById("reset");
const laps = document.getElementById("laps");

function formatTime(ms) {
  let milliseconds = Math.floor((ms % 1000) / 10);
  let seconds = Math.floor((ms / 1000) % 60);
  let minutes = Math.floor((ms / 60000) % 60);

  return (
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0") + ":" +
    String(milliseconds).padStart(2, "0")
  );
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

// START
startBtn.addEventListener("click", () => {
  if (running) return;

  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 10);

  running = true;
});

// PAUSE
pauseBtn.addEventListener("click", () => {
  if (!running) return;

  clearInterval(timerInterval);
  running = false;
});

// LAP
lapBtn.addEventListener("click", () => {
  if (!running) return;

  const li = document.createElement("li");
  li.textContent = `Lap ${lapCount}: ${formatTime(elapsedTime)}`;
  laps.appendChild(li);
  lapCount++;
});

// RESET
resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  elapsedTime = 0;
  running = false;
  lapCount = 1;
  updateDisplay();
  laps.innerHTML = "";
});
