/// <reference path="../typings/index.d.ts" />

import { assert } from "chai"
import { inject, register, resolve, context } from "../src/index.ts"

class Application {
  constructor () {
    register.instance(Application, this);
  }
}

class Screen {
  @inject(Application)
  app: Application;
}

class InjectStatic {
  @inject(Application)
  static app: Application;
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

  it("factory should create new instance every call", () => {
    @register.factory()
    class Factory {
      constructor () { }
    }

    assert.notEqual(resolve(Factory), resolve(Factory))
  })

  it("should return the same singleton instance", () => {
    @register.singleton()
    class Singleton {
      constructor () { }
    }

    assert.equal(resolve(Singleton), resolve(Singleton))
  })

  it("shouldn't resolve without registering", () => {
    assert.equal(resolve<Application>(Application), null);
  })

  it("should resolve by class definition", () => {
    let app = new Application();
    assert.equal(resolve(Application), app);
  })

})
