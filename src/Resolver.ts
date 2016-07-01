export enum Type { Instance, Singleton, Factory }

export default class Resolver {
  private instances: any;

  constructor (instances: any) {
    this.instances = instances;
  }

  public setInstances (instances: any) {
    this.instances = instances;
  }

}
