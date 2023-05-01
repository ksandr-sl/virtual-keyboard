export default function create(el, className, text = '') {
  const element = document.createElement(el);
  element.classList.add(className);
  element.innerText = text;

  return element;
}