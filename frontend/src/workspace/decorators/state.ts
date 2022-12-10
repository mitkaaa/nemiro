import { createParamsDecorator } from './utils/create-params-decorator'

import { STATE_DECORATOR } from '../constants'

export const State = (): Function => createParamsDecorator(STATE_DECORATOR)
