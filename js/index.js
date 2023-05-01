import {container, pressKey, releaseKey} from "./keyboard.js";

document.body.prepend(container);

let layoutEn = document.querySelectorAll('.en');
let layoutRu = document.querySelectorAll('.ru');

if (localStorage.getItem('layout') === 'ru') {
  for (let i = 0; i < layoutEn.length; i++) {
    layoutRu[i].classList.add('active');
  }
} else {
  for (let i = 0; i < layoutEn.length; i++) {
    layoutEn[i].classList.add('active');
  }
}

document.addEventListener('keydown', pressKey);
document.addEventListener('keyup', releaseKey);