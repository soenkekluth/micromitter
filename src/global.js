import MicroMitter from './micromitter';

const emitter = new MicroMitter();
const { on, off, emit } = emitter;
export { on };
export { off };
export { emit };

export default emitter;

