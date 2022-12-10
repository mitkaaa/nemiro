import { createParamsDecorator } from './utils/create-params-decorator'

import { CANVAS_DECORATOR } from '../constants'

export const Canvas = (): Function => createParamsDecorator(CANVAS_DECORATOR)
