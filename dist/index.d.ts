import Context from "./Context";
export declare var context: Context;
export declare function inject(id: string): Function;
export declare function register<T>(id: string, instance: T): void;
export declare function resolve<T>(idOrType: string | Object): T;
