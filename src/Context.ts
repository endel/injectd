export default class Context {
  instances: any = {};

  public register<T>(idOrInstance: any | T, instance?: T): void {
    if (instance === undefined) {
      this.instances[<any>idOrInstance.constructor] = idOrInstance;
    } else {
      this.instances[<any>idOrInstance] = instance;
    }
  }

  public inject(id: any): Function {
    return (proto: any, key: string) => {
      Object.defineProperty(proto, key, {
        configurable: true,
        enumerable: true,
        get: this.resolve.bind(this, id)
      });
    };
  }

  public resolve<T>(id: any): T {
    return this.instances[id];
  }

  public clear() {
    this.instances = {}
  }

}
