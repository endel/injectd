/// <reference path="../typings/index.d.ts" />

import { assert } from "chai"
import { inject, register, resolve, context } from "../src/index.ts"

@register.singleton()
class Singleton {
  constructor () {
    console.log("Singleton instantiated")
  }
}

class Application {
  constructor () {
    register.instance(this);
  }
}

class Screen {
  @inject(Application)
  app: Application;
}

class InjectStatic {
  @inject(Application)
  static app: Application;

  @inject(Singleton)
  static singleton: Singleton;
}

describe("injectd", () => {
  // clear all injections on each test
  beforeEach(() => context.clear())

  it("injected variable should be undefined without registering", () => {
    let screen = new Screen();
    assert.equal(screen.app, undefined);
  })

  it("should inject Application instance on Screen class", () => {
    let app = new Application();
    let screen = new Screen();
    assert.equal(screen.app, app);
  })

  it("should inject Application instance as static variable", () => {
    let app = new Application();
    assert.equal(InjectStatic.app, app);
  })

  it("shouldn't resolve without registering", () => {
    assert.equal(resolve<Application>(Application), null);
  })

  it("should resolve by class definition", () => {
    let app = new Application();
    assert.equal(resolve(Application), app);
  })

})
