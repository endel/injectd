export enum Type { Instance, Singleton, Factory }

export interface IRegistration  {
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
      this.instances[<any>idOrInstance.constructor] = { type: Type.Instance, ref: idOrInstance };
    } else {
      this.instances[<any>idOrInstance] = { type: Type.Instance, ref: instance };
    }
  }

  public factory(...args: any[]): ClassDecorator {
    return (constructor: Function) => {
      this.instances[<any>constructor] = { type: Type.Factory, ref: constructor }
    }
  }

  public singleton(...args: any[]): ClassDecorator {
    return (constructor: Function) => {
      this.instances[<any>constructor] = { type: Type.Singleton, ref: constructor }
    }
  }


}

