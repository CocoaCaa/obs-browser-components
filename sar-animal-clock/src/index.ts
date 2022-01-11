import { lightFormat } from 'date-fns';
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
];

async function main() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const animal = urlSearchParams.get('animal')?.toLowerCase() ?? 'fox';
  if (!AVAILABLE_ANIMALS.includes(animal)) {
    const errorMessageElement = document.createElement('div');
    errorMessageElement.textContent = `Animal "${animal}" not found. Available animals: ${AVAILABLE_ANIMALS.join(
      ', ',
    )}`;
    document.body.appendChild(errorMessageElement);
  }

  document.querySelectorAll('#animales > svg').forEach((svg) => {
    if (svg.id === animal) {
      return;
    }
    svg.remove();
  });
  const clockTextElement = document.querySelector<SVGTextElement>('text#clock-text');

  function tick() {
    if (!clockTextElement) {
      return;
    }

    const currentTime = new Date();
    clockTextElement.textContent = `${lightFormat(currentTime, 'hh:mm a')}`;
  }

  setInterval(tick, 1000);
  tick();
}

main();
