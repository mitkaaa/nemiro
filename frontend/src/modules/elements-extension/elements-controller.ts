import { IEvent } from 'fabric/fabric-impl'

import { CanvasService } from './canvas-service'
import { ControlService } from './control-service'
import { CONTROL_VALUE, RECT } from './constant'
import { ElementService } from './element-service'

import { Action } from '../../workspace/decorators/action'
import { Controller } from '../../workspace/decorators/controller'
import { Event } from '../../workspace/decorators/event'
import { HasState } from '../../workspace/decorators/has-state'
import { State } from '../../workspace/decorators/state'

const STATE_RECT_START_POINTS = 'ElementController:rectStartPoins'

@Controller()
export class ElementController {
    constructor(
        @State() private state: Map<string, any>,
        private elementService: ElementService,
        private controlService: ControlService,
        private canvasService: CanvasService,
    ) {}

    // Show Temporary Rect
    @Action('mouse:move')
    @HasState(CONTROL_VALUE, RECT)
    mouseHoverHandler(@Event() opt: IEvent) {
        const startPoints = this.state.get(STATE_RECT_START_POINTS)
        if (!startPoints) {
            this.elementService.moveTemporaryRect(opt.absolutePointer)
        }
    }

    @Action('mouse:down')
    @HasState(CONTROL_VALUE, RECT)
    mouseDownHandler(@Event() opt: IEvent) {
        // Hide Temporary Rect
        this.elementService.resetTemporaryRect()

        // Set start coord
        this.state.set(STATE_RECT_START_POINTS, opt.absolutePointer)
        this.elementService.createRect(opt.absolutePointer)

        // Disable selection elements
        this.canvasService.selection(false)
    }

    @Action('mouse:move')
    @HasState(STATE_RECT_START_POINTS)
    @HasState(CONTROL_VALUE, RECT)
    mouseMoveHandler(@Event() opt: IEvent) {
        const startPoints = this.state.get(STATE_RECT_START_POINTS)

        this.elementService.setSizeActiveObject({
            width: opt.absolutePointer.x - startPoints.x,
            height: opt.absolutePointer.y - startPoints.y,
        })
    }

    @Action('mouse:up')
    @HasState(STATE_RECT_START_POINTS)
    @HasState(CONTROL_VALUE, RECT)
    mouseMouseUpHandler() {
        this.state.set(STATE_RECT_START_POINTS, null)

        this.controlService.reset()

        // Enebled selection elements
        this.canvasService.selection(true)
    }
}
