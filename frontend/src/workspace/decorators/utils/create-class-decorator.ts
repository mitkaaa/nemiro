import 'reflect-metadata'

import { container } from '../../container'

export const createClassDecorator = (
    typeDecorator: string,
    options: { singleton?: boolean } = {},
): Function => {
    const getArgs = (instance: any, method?: string, args: any[] = []) => {
        const argsConstructor = (method
            ? Reflect.getMetadata('design:paramtypes', instance.prototype, method)
            : Reflect.getMetadata('design:paramtypes', instance))
             || []

        const ownArguments = argsConstructor.map(({ name }: { name: string }, key: number) => {
            // For Services
            const Instance = container.getService(instance.name, name)

            if (Instance) {
                return new Instance()
            }
            // For decorators
            const parameter = Reflect.getMetadata(
                method || 'constructor',
                method ? instance.prototype : instance,
                String(key),
            )
            return container.getParameterDecorator(typeDecorator, parameter)
        })

        // Replace arguments
        ownArguments.splice(0, args.length, ...args)

        return ownArguments
    }

    return <T extends { new (...args: any[]): any }>(constructor: T) => {
        let instanceForSingleton: T

        const ownConstructor = (...ownArgsC: any[]) => {
            if (instanceForSingleton && options.singleton === true) {
                return instanceForSingleton
            }

            const methods = Object.getOwnPropertyNames(constructor.prototype)

            const argsC = getArgs(constructor.prototype.constructor, void 0, ownArgsC)
            const instance = new constructor(...argsC)

            methods
                .filter((method: string) => method !== 'constructor')
                .forEach((method) => {
                    const ownMethod = constructor.prototype[method].bind(instance)
                    constructor.prototype[method] = (...args: any[]) =>
                        ownMethod(...getArgs(constructor, method, args))
                })

            if (options.singleton === true) {
                instanceForSingleton = instance
            }

            return instance
        }

        Object.defineProperty(ownConstructor, 'name', {
            value: constructor.name,
            configurable: true,
        })

        return ownConstructor
    }
}
