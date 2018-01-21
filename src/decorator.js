import MicroMitter from './micromitter';

const decorator = (target) => {
  const micro = new MicroMitter(target);
  micro.on = micro.on.bind(micro);
  micro.off = micro.off.bind(micro);
  micro.emit = micro.emit.bind(micro);

  const t = target.prototype ? target.prototype : target;

  if (typeof t.emit === 'undefined') {
    t.emit = micro.emit;
  }
  if (typeof t.on === 'undefined') {
    t.on = micro.on;
  }
  if (typeof t.off === 'undefined') {
    t.off = micro.off;
  }
};

export default decorator;
