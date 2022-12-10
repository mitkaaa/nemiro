import { createParamsDecorator } from './utils/create-params-decorator'

import { EVENT_EMMITER_DECORATOR } from '../constants'

export const EventEmmiter = (): Function => createParamsDecorator(EVENT_EMMITER_DECORATOR)
