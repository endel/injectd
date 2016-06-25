/// <reference path="../typings/index.d.ts" />

import { assert } from "chai"
import { inject, register, context } from "../src/index.ts"

interface IApp {}

class Application implements IApp {
  constructor () {
    register<IApp>("App", this);
  }
}

class Screen {
  @inject("App")
  app: IApp;
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

})
