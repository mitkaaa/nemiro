import { createClassDecorator } from './utils/create-class-decorator'

import { SERVICE_DECORATORS } from '../constants'

type ServiceOptions = {
    singleton: boolean
}

export const Service = (options?: ServiceOptions): Function =>
    createClassDecorator(SERVICE_DECORATORS, options)
