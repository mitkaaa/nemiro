import {
    SERVICE_DECORATORS,
    HASSTATE,
    CONTROLLER_DECORATORS,
} from '../constants'
import { container } from '../container'

export const HasState = (key: string, value?: string | boolean) =>
    (target: any, propertyKey: string) => {
        container.addMethodDecorator(
            [CONTROLLER_DECORATORS, SERVICE_DECORATORS],
            HASSTATE,
            [key, value, () => target[propertyKey]],
        )
    }
