import { createParamsDecorator } from './utils/create-params-decorator'

import { DRAW_DECORATOR } from '../constants'

export const Draw = (): Function => createParamsDecorator(DRAW_DECORATOR)
