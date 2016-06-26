/// <reference path="../typings/index.d.ts" />

import { assert } from "chai"
import { inject, register, resolve, context } from "../src/index.ts"

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

  describe("#inject", () => {
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

  describe("#resolve", () => {

    it("shouldn't resolve without registering", () => {
      assert.equal(resolve<IApp>("App"), null);
      assert.equal(resolve<IApp>(Application), null);
    })

    it("should resolve by name", () => {
      let app = new Application();
      assert.equal(resolve<IApp>("App"), app);
    })

    it("should resolve by class definition", () => {
      let app = new Application();
      assert.equal(resolve<IApp>(Application), app);
    })

  })

})
