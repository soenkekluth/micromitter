import Emitter from './emitter';
export { default as micromitter } from './decorator';
export { Emitter as MicroMitter };
export default Emitter;
export const emitter = new Emitter();
