import { CanvasService } from './canvas-service'
import { ControlService } from './control-service'
import { ElementController } from './elements-controller'
import { ControlController } from './control-controller'
import { ElementService } from './element-service'

import { Extension } from '../../workspace'

export const elementModule: Extension = {
    controllers: [ElementController, ControlController],
    services: [ElementService, ControlService, CanvasService],
}
