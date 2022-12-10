import {
    ACTION,
    CONTROLLER_DECORATORS,
} from '../constants'
import { container } from '../container'

// type actionType = 'mousedown' | 'mouseup' | 'mousemove'

export const Action = (actionType: string) =>
    (target: any, propertyKey: string) => {
        container.addMethodDecorator(
            [CONTROLLER_DECORATORS],
            `${ACTION}-${actionType}`,
            () => target[propertyKey],
        )
    }
