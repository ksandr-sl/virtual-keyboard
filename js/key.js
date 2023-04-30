export default class Key {
  constructor({key, shift, code, keycode}) {
    this.key = key;
    this.shift = shift;
    this.code = code;
    this.keycode = keycode;
  }
}