export default class Context {
  instances: {[id: string]: any} = {};

  public register<T>(id: string, instance: T): void {
    this.instances[id] = instance;
  }

  public inject(id: string): Function {
    return (proto: any, key: string) => {
      Object.defineProperty(proto, key, {
        configurable: true,
        enumerable: true,
        get: () => { return this.instances[id] }
      });
    };
  }

  public resolve<T>(idOrType: string | Object): T {
    if (typeof(idOrType)==="string") {
      return this.instances[ <string>idOrType ];

    } else {
      for (let id in this.instances) {
        if (this.instances[id] instanceof <any>idOrType) {
          return this.instances[id];
        }
      }
    }
  }

  public clear() {
    this.instances = {}
  }

}
