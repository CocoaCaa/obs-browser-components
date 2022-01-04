import { format } from 'date-fns';
import './assets/index.css';
import { createElementFromHtml } from './utils';

const AVAILABLE_ANIMALS = ['fox', 'skullcat', 'deer'];

async function main() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const animal = urlSearchParams.get('animal') ?? 'fox';
  if (!AVAILABLE_ANIMALS.includes(animal)) {
    const errorMessageElement = document.createElement('div');
    errorMessageElement.textContent = `Animal "${animal}" not found. Available animals: ${AVAILABLE_ANIMALS.join(
      ', ',
    )}`;
    document.body.appendChild(errorMessageElement);
  }
  const animalResponse = await fetch(`animals/${animal}.svg`);
  document.body.appendChild(createElementFromHtml(await animalResponse.text()));
  const clockTextElement = document.querySelector<SVGTextElement>('text#clock-text');

  function tick() {
    if (!clockTextElement) {
      return;
    }

    const currentTime = new Date();
    clockTextElement.textContent = `${format(currentTime, 'hh:mm a')}`;
  }

  setInterval(tick, 1000);
  tick();
}

main();
