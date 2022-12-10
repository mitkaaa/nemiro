import {
    SERVICE_DECORATORS,
    EVENT_EMMITER,
    CONTROLLER_DECORATORS,
} from '../constants'
import { container } from '../container'

export const On = (eventType: string) =>
    (target: any, propertyKey: string) => {
        container.addMethodDecorator(
            [CONTROLLER_DECORATORS, SERVICE_DECORATORS],
            `${EVENT_EMMITER}-${eventType}`,
            (...args: any[]) => target[propertyKey](...args),
        )
    }
