export default class Context {
    instances: {
        [id: string]: any;
    };
    register<T>(id: string, instance: T): void;
    inject(id: string): Function;
    resolve<T>(idOrType: string | Object): T;
    clear(): void;
}
