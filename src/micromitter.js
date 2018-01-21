export default class MicroMitter {
  /**
   * Creates an instance of MicroMitter.
   * @param {any} target  - the event target
   * @memberof MicroMitter
   */
  constructor(target) {
    this.types = Object.create(null);
    this.target = target || this;
  }

  /**
   * adds an event handler to an event type
   *
   * @param {string} type
   * @param {function} handler
   * @returns {MicroMitter} self
   * @memberof MicroMitter
   * @example
   * emitter.on('type', (e)=>{
  console.log(e);
});
   *
   */
  on(type, handler) {
    ((this.types[type] || (this.types[type] = [])).indexOf(handler) === -1)
      && (this.types[type].push(handler));
    return this;
  }

  /**
   * removes either a specific handler or all handlers related to an event type
   *
   * @param {string} type
   * @param {function} handler
   * @returns {MicroMitter} self
   * @memberof MicroMitter
   */
  off(type, handler) {
    (handler in this.types[type] && this.types[type].splice(this.types[type].indexOf(handler), 1)
    || (!!this.types[type] && (this.types[type].length = 0, delete this.types[type])));
    return this;
  }

  /**
   * adds an event handler to an event type and immediately removes it after first event call
   *
   * @param {string} type
   * @param {function} handler
   * @returns {MicroMitter} self
   * @memberof MicroMitter
   * @example
   * emitter.onc('type', (e)=>{
  console.log('only once');
});
   */
  once(type, handler) {
    let h = (event) => { this.off(type, h) && (handler(event), h = null); };
    return this.on(type, h);
  }

  /**
   * triggers an event for a specific type with an optional data object
   *
   * @param {string} type
   * @param {any} [data={}]
   * @returns {MicroMitter} self
   * @memberof MicroMitter
   * @example emitter.off('type', handler);
   */
  emit(type, data = {}) {
    if (this.types[type]) {
      const evt = Object.assign({}, { target: (data.target || this.target) }, data, { type });
      for (let i = 0, l = this.types[type].length; i < l; i++) {
        this.types[type][i](evt);
      }
    }
    return this;
  }
}
