injectd 0.1 ![Build status](https://travis-ci.org/endel/injectd.svg?branch=master)
===

This library is the leanest dependency injection implementation you can
possibly have for JavaScript (ES2016) and TypeScript. **~1kb filesize
(uncompressed)**

The API consists in only three methods: `inject`, `register` and `resolve`.

- `register(id: string, instance: any)`: Register instance with given identifier. The instance registered will be available for `inject` and `resolve` methods.
- `inject(id: string)`: A decorator to inject a previously registered instance into target class property. ([see usage below](#usage))
- `resolve(idOrType: string | Object)`: Get previously registered instance by given name or type.

Configuration
---

Your compiler/transpiler need to understand the [decorator
syntax](https://github.com/wycats/javascript-decorators/blob/master/README.md)
in order to be able to use `injectd`. Here's how you enable it using:

- [Babel](https://babeljs.io/docs/plugins/syntax-decorators/)
- [TypeScript](https://www.typescriptlang.org/docs/handbook/decorators.html)

Usage
---

```typescript
interface IApp {}

// application.ts
import { register } from "injectd"

class Application implements IApp {
  constructor () {
    register<IApp>("App", this);
  }
}

// screen.ts
import { inject } from "injectd"

class Screen {
  @inject("App")
  app: IApp;
}

// main.ts
let myApp = new Application();

// anywhere.ts
let screen = new Screen();
screen.app // your "Application" instance is here!
```

License
---

MIT
