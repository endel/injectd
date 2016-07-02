import Registerer, { IRegistration, Type } from "./Registerer"

export default class Context {
  instances: { [id: string]: IRegistration } = {};

  public register: Registerer = new Registerer(this.instances);

  public inject(id: any): PropertyDecorator {
    return (proto: any, key: string) => {
      let injection: any = undefined;

      Object.defineProperty(proto, key, {
        configurable: true,
        enumerable: true,
        get: () => {
          if (injection === undefined) {
            injection = this.resolve(id)
          }
          return injection;
        }
      });
    };
  }

  public resolve<T>(id: any): T {
    let registration = this.instances[<string>id] || <IRegistration>{}
    let instance: any = undefined;

    switch ( registration.type ) {
      case Type.Instance:
        instance = registration.ref
        break;
      case Type.Singleton:
        if ((<any>registration).getInstance !== undefined) {
          registration.ref = (<any>registration).getInstance()
        } else if (typeof(registration.ref) === "function") {
          registration.ref = new (registration.ref)
        }
        instance = registration.ref
        break;
      case Type.Factory:
        instance = new registration.ref
        break;
    }

    return instance;
  }

  public clear() {
    this.instances = {}
    this.register.setInstances(this.instances)
  }

}
