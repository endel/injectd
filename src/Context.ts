import Registerer from "./Registerer"
import Resolver from "./Resolver.ts"

export default class Context {
  private instances: any = {};

  private resolver: Resolver = new Resolver(this.instances);
  public register: Registerer = new Registerer(this.instances);

  public inject(id: any): PropertyDecorator {
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
    this.register.setInstances(this.instances)
  }

}
