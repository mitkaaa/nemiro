import { IEvent } from 'fabric/fabric-impl'

import { Grid } from './grid/grid'
import { WorkspaceService } from './workspace-service'

import { Action } from '../../workspace/decorators/action'
import { Controller } from '../../workspace/decorators/controller'
import { Event } from '../../workspace/decorators/event'
import { On } from '../../workspace/decorators/on'

@Controller()
export class WorkspaceController {
    private minPeriodZoom = 0.2

    private maxPeriodZoom = 500

    constructor(private workspace: WorkspaceService, private grid: Grid) {}

    @On('INIT')
    init() {
        this.workspace.init()
        this.workspace.setSize()
        this.grid.setZoomPeriod([this.minPeriodZoom, this.maxPeriodZoom])
    }

    @Action('mouse:wheel')
    moveHandler(
        @Event() opt: IEvent<WheelEvent>,

    ) {
        const {
            deltaX, deltaY, offsetX, offsetY,
        } = opt.e
        if (opt.e.ctrlKey) {
            this.workspace.zoom(
                { delta: deltaY, offsetX, offsetY },
                [this.minPeriodZoom, this.maxPeriodZoom],
            )
        } else {
            this.workspace.move(deltaX, deltaY)
        }
        opt.e.preventDefault()
        opt.e.stopPropagation()
    }
}
