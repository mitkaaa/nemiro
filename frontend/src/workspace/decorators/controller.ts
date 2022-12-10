import { createClassDecorator } from './utils/create-class-decorator'

import { CONTROLLER_DECORATORS } from '../constants'

export const Controller = (): Function => createClassDecorator(CONTROLLER_DECORATORS)
