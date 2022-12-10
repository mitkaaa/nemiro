/**
 * {
 *  [nameContainer]: {
 *      [nameService]: Service
 *  }
 * }
 */

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

class Container {
    private containerServices: Map<string, Map<string, { new (...args: any[]): {} }>>

    private containerParameterDecorators: Map<string, Map<string, Function>>

    private containerMethodDecorators: Map<string, Map<string, Function[]>>

    constructor() {
        this.containerServices = new Map()
        this.containerParameterDecorators = new Map()
        this.containerMethodDecorators = new Map()
    }

    addService(instance: any, instanceSerivecesList: Array<{ new (...args: any[]): any }>) {
        if (!this.containerServices.has(capitalizeFirstLetter(instance.name))) {
            this.containerServices.set(capitalizeFirstLetter(instance.name), new Map())
        }
        instanceSerivecesList.forEach((Instance: { new (...args: any[]): any }) => {
            const mapList = this.containerServices.get(capitalizeFirstLetter(instance.name))
            mapList.set(capitalizeFirstLetter(Instance.name), Instance)
        })
    }

    getService(instanceName: string, serviceName: string): { new (...args: any[]): {} } | void {
        return this.containerServices.get(instanceName)?.get(serviceName)
    }

    addParameterDecorator(types: string[], decoratorName: string, payload: any) {
        types.forEach((type) => {
            if (!this.containerParameterDecorators.has(type)) {
                this.containerParameterDecorators.set(type, new Map())
            }
            const decoratorTypeMap = this.containerParameterDecorators.get(type)
            decoratorTypeMap.set(decoratorName, payload)
        })
    }

    getParameterDecorator(type: string, decoratorName: string) {
        return this.containerParameterDecorators.get(type)?.get(decoratorName)
    }

    addMethodDecorator(types: string[], decoratorName: string, payload: any) {
        types.forEach((type) => {
            if (!this.containerMethodDecorators.has(type)) {
                this.containerMethodDecorators.set(type, new Map())
            }
            const decoratorTypeMap = this.containerMethodDecorators.get(type)
            if (!decoratorTypeMap.has(decoratorName)) {
                decoratorTypeMap.set(decoratorName, [payload])
            } else {
                decoratorTypeMap.get(decoratorName).push(payload)
            }
        })
    }

    getMethodDecorator(type: string, decoratorName: string) {
        return this.containerMethodDecorators.get(type)?.get(decoratorName)
    }
}

export const container = new Container()
