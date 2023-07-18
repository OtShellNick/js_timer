const inputElement = document.querySelector('input');
const buttonElement = document.querySelector('button');
const timerElement = document.querySelector('span');

const formatTimer = (seconds) => {
  const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${remainingSeconds}`;
};

const createTimerAnimator = () => {
  let animationId;

  const animate = (timestamp, startTime, seconds) => {
    const elapsedTime = timestamp - startTime;
    const remainingSeconds = Math.max(0, seconds - Math.floor(elapsedTime / 1000));
    timerElement.textContent = formatTimer(remainingSeconds);

    if (remainingSeconds > 0) {
      animationId = requestAnimationFrame((timestamp) => animate(timestamp, startTime, seconds));
    } else {
      timerElement.textContent = 'Время вышло!';
    }
  };

  return (seconds) => {
    cancelAnimationFrame(animationId);
    const startTime = performance.now();
    animate(startTime, startTime, seconds);
  };
};

const animateTimer = createTimerAnimator();

inputElement.addEventListener('input', () => {
  const input = inputElement.value;
  const cleanedInput = input.replace(/\D/g, '');
  inputElement.value = cleanedInput;
});

buttonElement.addEventListener('click', () => {
  const seconds = Number(inputElement.value);

  animateTimer(seconds);

  inputElement.value = '';
});