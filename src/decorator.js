import Emitter from './emitter';

export default (target) => {

  const micro = new Emitter(target);
  micro.on = micro.on.bind(micro);
  micro.off = micro.off.bind(micro);
  micro.emit = micro.emit.bind(micro);

  const t = target.prototype ? target.prototype : target;

  if (!t.emit) {
    t.emit = micro.emit;
  }
  if (!t.on) {
    t.on = micro.on;
  }
  if (!t.off) {
    t.off = micro.off;
  }

  if (!target.prototype) {
    t.__microEmit = micro;
  }
}
