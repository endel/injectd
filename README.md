injectd 0.1 ![Build status](https://travis-ci.org/endel/injectd.svg?branch=master)
===

This library is the leanest dependency injection implementation you can
possibly have for JavaScript (ES2016) and TypeScript. Just **~1kb filesize
(uncompressed)**

The API consists in three methods: `inject`, `register` and `resolve`.

- `register<T>(idOrInstance: string | any, instance?: any): void`: Register instance with given identifier. The instance registered will be available for `inject` and `resolve` methods.
- `inject(id: any)`: A decorator to inject a previously registered instance into target class property. ([see usage below](#usage))
- `resolve<T>(id: any): T`: Get previously registered instance by given name or type. (used under the hood by `inject` method)

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
// application.ts
import { register } from "injectd"

export class Application {
  constructor () {
    register(this);
  }
}

// screen.ts
import { Application } from "./application"
import { inject } from "injectd"

class Screen {
  @inject(Application)
  app: Application;
}

// main.ts
let myApp = new Application();

// anywhere.ts
import { Screen } from "./screen"

let screen = new Screen();
screen.app // your "Application" instance is here!
```

License
---

MIT
