import './assets/index.css';
import { source } from 'asset:./assets/fox.svg';
import { padLeft, createElementFromHtml } from './utils';

const clockElementSvg = atob(source);
document.body.appendChild(createElementFromHtml(clockElementSvg));
const clockTextElement = document.querySelector<SVGTextElement>('text#clock-text');

function tick() {
  if (!clockTextElement) {
    return;
  }

  const currentTime = new Date();
  const hour = padLeft(currentTime.getHours().toString(), '0', 2);
  const minute = padLeft(currentTime.getMinutes().toString(), '0', 2);
  const second = padLeft(currentTime.getSeconds().toString(), '0', 2);
  clockTextElement.textContent = `${hour}:${minute}:${second}`;
}

setInterval(tick, 1000);
tick();
