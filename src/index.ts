import Context from "./Context"
export var context = new Context()

export function inject(id: any): Function {
  return context.inject(id);
}

export function register<T>(idOrInstance: any | T, instance?: T) {
  context.register(idOrInstance, instance);
}

export function resolve<T>(id: any): T {
  return context.resolve<T>(id);
}
