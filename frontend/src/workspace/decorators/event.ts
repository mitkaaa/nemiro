import { createParamsDecorator } from './utils/create-params-decorator'

import { EVENT_DECORATOR } from '../constants'

export const Event = (): Function => createParamsDecorator(EVENT_DECORATOR)
