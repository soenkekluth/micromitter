export default class Emitter {
  constructor(target) {
    this.types = {};
    this.target = target || this;
  }

  on(type, handler) {
    ((this.types[type] || (this.types[type] = [])).indexOf(handler) === -1) && (this.types[type].push(handler));
  }

  off(type, handler) {
    (this.types[type] && handler) && (this.types[type].splice(this.types[type].indexOf(handler), 1)) || (this.types[type].length = 0, delete this.types[type]);
  }

  emit(type, obj) {
    const evtObj = obj || {};
    (evtObj.target || (evtObj.target = this.target));
    evtObj.type = type;
    if (this.types[type]) {
      for (let i = 0, l = this.types[type].length; i < l; i++) {
        this.types[type][i](evtObj);
      }
    }
  }
}
