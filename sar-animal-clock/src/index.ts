import { intervalToDuration, isPast, lightFormat } from 'date-fns';
import './assets/styles/index.scss';

const AVAILABLE_ANIMALS = [
  'fox',
  'skullcat',
  'deer',
  'deer-banana',
  'deer-blue',
  'deer-mint',
  'deer-pink',
  'deer-rudolph',
  'deer-shadow',

  'redpanda',
  'redpanda-berry',
  'redpanda-bubblegum',
  'redpanda-licorice',
  'redpanda-lime',
  'redpanda-mango',
  'redpanda-pastel',

  'dog-pomeranian',
  'dog-labrador-golden',

  'wolf',
  'wolf-wherewolf',

  'raven-albino',

  'sheep-black',
  'sheep-blue',
  'sheep-brown',
  'sheep-dark',
  'sheep-green',
  'sheep-knitted',
  'sheep',

  'cocoacaa-deer',
];

async function main() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const animal = urlSearchParams.get('animal')?.toLowerCase() ?? 'fox';
  const countDownToYear = urlSearchParams.get('countdown-to-year')
    ? Number(urlSearchParams.get('countdown-to-year'))
    : undefined;
  if (!AVAILABLE_ANIMALS.includes(animal)) {
    const errorMessageElement = document.createElement('div');
    errorMessageElement.innerHTML = `Animal "${animal}" not found. Available animals names: ${AVAILABLE_ANIMALS.map(
      (v) => `<a href="?animal=${v}"><code>${v}</code></a>`,
    ).join(', ')}`;
    document.body.appendChild(errorMessageElement);
  }

  document.querySelectorAll('#animales > svg').forEach((svg) => {
    if (svg.id === animal) {
      return;
    }
    svg.remove();
  });
  const clockTextElement = document.querySelector<SVGTextElement>('text#clock-text');
  let isOdd = false;

  function tick() {
    isOdd = !isOdd;
    if (!clockTextElement) {
      return;
    }

    const currentTime = new Date();

    if (countDownToYear && !isNaN(countDownToYear)) {
      const targetDate = new Date(countDownToYear, 0, 1, 0, 0, 0, 0);
      const duration = intervalToDuration({
        start: currentTime,
        end: targetDate,
      });
      if (isPast(targetDate)) {
        clockTextElement.textContent = isOdd ? "٩( 'ω' )و " : `✧${countDownToYear}✧`;
      } else {
        clockTextElement.textContent = `${duration.hours?.toString().padStart(2, '0')}:${duration.minutes
          ?.toString()
          .padStart(2, '0')}:${duration.seconds?.toString().padStart(2, '0')}`;
      }
    } else {
      clockTextElement.textContent = `${lightFormat(currentTime, 'hh:mm a')}`;
    }
  }

  setInterval(tick, 1000);
  tick();
}

main();
