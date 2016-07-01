import { Type } from "./Resolver.ts"

interface IRegistration  {
  type: Type;
  ref: any;
}

export default class Registerer {
  private instances: any;

  constructor (instances: any) {
    this.instances = instances;
  }

  public setInstances (instances: any) {
    this.instances = instances;
  }

  public instance<T>(idOrInstance: any | T, instance?: T): void {
    if (instance === undefined) {
      this.instances[<any>idOrInstance.constructor] = idOrInstance;
    } else {
      this.instances[<any>idOrInstance] = instance;
    }
  }

  public factory(...args: any[]): ClassDecorator {
    return (constructor: Function) => {
      this.instances[<any>constructor] = constructor
    }
  }

  public singleton(...args: any[]): ClassDecorator {
    return (constructor: Function) => {
      // console.log("register singleton: ", this, constructor)
      this.instances[<any>constructor] = constructor
    }
  }


}

