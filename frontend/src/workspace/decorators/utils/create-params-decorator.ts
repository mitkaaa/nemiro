export const createParamsDecorator = (typeDecorator: string): Function => (
    target: any,
    propertyKey: string,
    parameterIndex: number,
): void => {
    if (propertyKey) {
        Reflect.defineMetadata(propertyKey, typeDecorator, target, String(parameterIndex))
    } else {
        Reflect.defineMetadata('constructor', typeDecorator, target, String(parameterIndex))
    }
}
