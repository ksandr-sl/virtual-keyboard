import create from "./utils/create.js";
import en from "./layouts/en.js";
import ru from "./layouts/ru.js";

const container = create('div', 'container');
const title = create('h1', 'title', 'RSS Virtual Keyboard');
const subtitle = create('h3', 'subtitle', 'Keyboard created in macOS');
const text = create('p', 'text', 'To switch language: left ctrl + left cmd');
const output = create('textarea', 'output');
const keyboard = create('div', 'keyboard');

container.append(title);
container.append(subtitle);
container.append(text);
container.append(output);
container.append(keyboard);

let i = 0;

en.forEach(e => {
  let j = 0;

  let keyboardRow = create('div', 'keyboard__row');

  e.forEach(e => {
    let key = create('div', 'keyboard__key');
    key.dataset.code = e.code;
    keyboardRow.append(key);
    key.addEventListener('mousedown', mouseDown);
    key.addEventListener('mouseup', mouseUp);

    let layoutEn = create('span', 'en');
    key.append(layoutEn);

    let caseDown = create('span', 'case-down', e.caseDown);
    caseDown.classList.add('active');

    let caseUp = create('span', 'case-up', e.caseUp);

    layoutEn.append(caseDown);
    layoutEn.append(caseUp);

    let layoutRu = create('span', 'ru');
    key.append(layoutRu);

    caseDown = create('span', 'case-down', ru[i][j].caseDown);
    caseDown.classList.add('active');

    caseUp = create('span', 'case-up', ru[i][j].caseUp);

    layoutRu.append(caseDown);
    layoutRu.append(caseUp);
    j++;
  })

  keyboard.append(keyboardRow);
  i++;
})

// ============================================== Keyboard events ===========================================================
function pressKey(e) {
  // console.log(e);

  e.preventDefault();
  output.focus();
  document.querySelector(`[data-code="${e.code}"]`).classList.add('pressed');

  let layoutEn = document.querySelectorAll('.en');
  let layoutRu = document.querySelectorAll('.ru');
  let caseDown = document.querySelectorAll('.case-down');
  let caseUp = document.querySelectorAll('.case-up');

  if (e.code.match(/Control|MetaRight|AltLeft|AltRight/)) {
    return;
  } else if (e.code.match(/CapsLock/)) {

    for (let i = 0; i < caseDown.length; i++) {
      caseDown[i].classList.toggle('active');
      caseUp[i].classList.toggle('active');
    }

  } else if (e.ctrlKey && e.code.match(/MetaLeft/)) { //change layout

    for (let i = 0; i < layoutEn.length; i++) {
      layoutEn[i].classList.toggle('active');
      layoutRu[i].classList.toggle('active');
    }

    let layout = layoutEn[0].classList.contains('active') ? 'en' : 'ru';
    localStorage.setItem('layout', layout);

  } else if (e.code.match(/Tab/)) {
    output.value += '  ';
  } else if (e.code.match(/Backspace/)) {
    output.value = output.value.slice(0, -1);
  } else if (e.code.match(/Enter/)) {
    output.value += '\n';
  } else if (e.code.match(/ShiftLeft|ShiftRight/)) {

    for (let i = 0; i < caseDown.length; i++) {
      caseDown[i].classList.toggle('active');
      caseUp[i].classList.toggle('active');
    }

  } else if (e.code.match(/ArrowUp|ArrowRight|ArrowLeft|ArrowDown/)) {
    output.value += document.querySelector(`[data-code="${e.code}"]`).innerText;
  } else if (!e.metaKey) {
    output.value += e.key;
  }
}

function releaseKey(e) {
  let caseDown = document.querySelectorAll('.case-down');
  let caseUp = document.querySelectorAll('.case-up');

  document.querySelector(`[data-code="${e.code}"]`).classList.remove('pressed');
  if (e.code.match(/ShiftLeft|ShiftRight/)) {

    for (let i = 0; i < caseDown.length; i++) {
      caseDown[i].classList.toggle('active');
      caseUp[i].classList.toggle('active');
    }
  }
}

// ============================================== Mouse events ===========================================================
let CapsLock = false;

function mouseDown(e) {
  console.log(e);

  e.preventDefault();
  let innerText = e.target.innerText;
  let caseDown = document.querySelectorAll('.case-down');
  let caseUp = document.querySelectorAll('.case-up');

  e.target.classList.add('pressed');

  if (innerText.match(/Ctrl|Opt|Cmd/)) {
    return;
  } else if (innerText.match(/Tab/)) {
    output.value += '  ';
  } else if (innerText.match(/Backspace/)) {
    output.value = output.value.slice(0, -1);
  } else if (innerText.match(/Enter/)) {
    output.value += '\n';
  } else if (innerText.match(/CapsLock/)) {

    for (let i = 0; i < caseDown.length; i++) {
      caseDown[i].classList.toggle('active');
      caseUp[i].classList.toggle('active');
    }

    CapsLock = CapsLock ? false : true;

    // if (CapsLock) {
    //   CapsLock = false;
    //   e.target.classList.add('highlited');
    // } else {
    //   CapsLock = true;
    //   e.target.classList.remove('highlited');
    // }

  } else if (innerText.match(/Shift/)) {

    for (let i = 0; i < caseDown.length; i++) {
      caseDown[i].classList.toggle('active');
      caseUp[i].classList.toggle('active');
    }

  } else {
    output.value += e.target.innerText;

    if (caseUp[0].classList.contains('active')) {
      if (CapsLock) {
        console.log('CapsLock ', CapsLock);

        return;
      } else {
        console.log('CapsLock ', CapsLock);

        for (let i = 0; i < caseUp.length; i++) {
          caseDown[i].classList.toggle('active');
          caseUp[i].classList.toggle('active');
        }
      }
    }
  }
}

function mouseUp(e) {
  let innerText = e.target.innerText;
  let caseDown = document.querySelectorAll('.case-down');
  let caseUp = document.querySelectorAll('.case-up');

  e.target.classList.remove('pressed');

}

export {container, pressKey, releaseKey};
