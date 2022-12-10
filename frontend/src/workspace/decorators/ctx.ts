import { createParamsDecorator } from './utils/create-params-decorator'

import { CTX_DECORATOR } from '../constants'

export const Ctx = (): Function => createParamsDecorator(CTX_DECORATOR)
