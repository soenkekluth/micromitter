import test from 'ava';
import MicroEmitter, { decorator, emitter } from './lib/micromitter.cjs';
// import { setImmediate } from 'timers';

// require('setimmediate');

test.beforeEach((t) => {
  t.context.emitter = new MicroEmitter(global);
});
// test.afterEach(t => {
// 	t.context.emitter.off;
// });

test('adds handler only ones', (t) => {
  let counter = 0;
  const handler = (e) => {
    t.true(e.type === 'test');
    t.true(e.foo === 'bar');
    counter += 1;
    t.true(counter === 1);
  };

  t.context.emitter.on('test', handler);
  t.context.emitter.on('test', handler);

  t.context.emitter.emit('test', { foo: 'bar' });
});


test('emites event type', (t) => {
  t.context.emitter.on('test', (e) => {
    t.true(e.type === 'test');
  });

  t.context.emitter.emit('test');
});


test('removes event type', (t) => {
  t.context.emitter.on('test', (e) => {
    t.context.emitter.off('test');
    t.true(e.type === 'test');
    t.is(t.context.emitter.types.test, undefined, 'no test event type');
    // t.true( === 'test');
  });

  t.context.emitter.emit('test');
});

// test('emites immidiate type', (t) => {
//   t.context.emitter.on('test', (e) => {
//     setImmediate(() => {
//       console.dir(e);
//     });
//     t.true(e.type === 'test');
//   });

//   t.context.emitter.emit('test');
// });

test('emites type and data', (t) => {
  t.context.emitter.on('type', (e) => {
    t.true(e.type === 'type');
    t.true(e.foo === 'bar');
    t.true(e.bar === 'foo');
  });

  t.context.emitter.emit('type', { foo: 'bar', bar: 'foo' });
});


test('emites only once', (t) => {
  let counter = 0;
  t.context.emitter.once('test', (e) => {
    counter += 1;
  });

  t.context.emitter.emit('test', { foo: 'bar' });
  t.context.emitter.emit('test', { foo: 'bar' });
  t.context.emitter.emit('test', { foo: 'bar' });
  t.context.emitter.emit('test', { foo: 'bar' });
  t.context.emitter.emit('test', { foo: 'bar' });
  t.context.emitter.emit('test', { foo: 'bar' });

  t.true(counter === 1);
});


test('decorator', (t) => {
  class Tester {
    onTest(e) {
      t.true(e.type === 'test');
      t.true(e.foo === 'bar');
    }
  }

  decorator(Tester);

  const tt = new Tester();
  tt.on('test', tt.onTest);
  tt.emit('test', { foo: 'bar' });
});

test('es7 decorator', (t) => {

  @decorator
  class TestDec {
    onTest(e) {
      t.true(e.type === 'test');
      t.true(e.foo === 'bar');
    }
  }

  const tt = new TestDec();
  tt.on('test', tt.onTest);
  tt.emit('test', { foo: 'bar' });
});

test('global emitter', (t) => {
  emitter.on('global', (e) => {
    t.true(e.type === 'global');
    t.true(e.target === emitter);
  });
  emitter.emit('global', { foo: 'bar' });
});
