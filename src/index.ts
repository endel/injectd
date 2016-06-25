import Context from "./Context"
export var context = new Context()

export function inject(id: string): Function {
  return context.inject(id);
}

export function register<T>(id: string, instance: T) {
  context.register(id, instance)
}

export function resolve<T>(idOrType: string | Object): T {
  return context.resolve<T>(idOrType);
}
