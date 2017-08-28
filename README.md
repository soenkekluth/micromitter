# micromitter
minimal and performant event emitter / emitter with custom events and payload


## Usage

### create instance
```js
import Emitter from 'micromitter';

const emitter = new Emitter();

emitter.on('test', (e)=>{
  console.log(e.type === 'test');
  console.log(e.foo === 'bar');
});

emitter.emit('test', {foo:'bar'});

```

### use global instance
```js
import {emitter} from 'micromitter';

emitter.on('test', (e)=>{
  console.log(e.type === 'test');
  console.log(e.foo === 'bar');
});

emitter.emit('test', {foo:'bar'});

```

### use decorator
```js
import { micromitter } from 'micromitter';

//v1: use es7 decorators
@micromitter
class Tester {
	onTest(e){
		console.log(e.type === 'test');
		console.log(e.foo === 'bar');
	}
}

//v2 use the decorator as a function
micromitter(Tester);

const tt = new Tester();

tt.on('test', tt.onTest);
tt.emit('test', {foo:'bar'});
```
