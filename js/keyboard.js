import create from "./utils/create.js";
import en from "./layouts/en.js"
import ru from "./layouts/ru.js"

const container = create('div', 'container');
const title = create('h1', 'title', 'RSS Virtual Keyboard');
const subtitle = create('h3', 'subtitle', 'Keyboard created in macOS');
const text = create('p', 'text', 'To switch language: left ctrl + space');
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

    let layoutEn = create('span', 'en');
    layoutEn.classList.add('active');
    key.append(layoutEn);

    let caseDown = create('span', 'case-donw', e.caseDown);
    caseDown.classList.add('active');

    let caseUp = create('span', 'case-up', e.caseUp);

    layoutEn.append(caseDown);
    layoutEn.append(caseUp);

    let layoutRu = create('span', 'ru');
    key.append(layoutRu);

    caseDown = create('span', 'case-donw', ru[i][j].caseDown);
    caseUp = create('span', 'case-up', ru[i][j].caseUp);

    layoutRu.append(caseDown);
    layoutRu.append(caseUp);
    j++;
  })

  keyboard.append(keyboardRow);
  i++;
})

export default container;