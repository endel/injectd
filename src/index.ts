import Context from "./Context"
import Registerer from "./Registerer.ts"

export var context: Context = new Context()
export var register: Registerer = context.register;

export function inject(id: any): Function {
  return context.inject(id);
}

export function resolve<T>(id: any): T {
  return context.resolve<T>(id);
}
