import { fabric } from 'fabric'

import { Grid } from './grid/grid'

import { Canvas } from '../../workspace/decorators/canvas'
import { Service } from '../../workspace/decorators/service'

@Service()
export class WorkspaceService {
    constructor(
        @Canvas() private canvas: fabric.Canvas,
        private grid: Grid,
    ) {}

    init() {
        this.canvas.uniformScaling = false
    }

    zoom(
        { delta, offsetX, offsetY }: { delta: number, offsetX: number, offsetY: number },
        [minPeriodZoom, maxPeriodZoom]: [number, number],
    ) {
        let zoom = this.canvas.getZoom()
        zoom *= 1.01 ** delta
        if (zoom > maxPeriodZoom) zoom = maxPeriodZoom
        if (zoom < minPeriodZoom) zoom = minPeriodZoom

        this.canvas.zoomToPoint({ x: offsetX, y: offsetY }, zoom)

        this.grid.updateOfZoom(zoom)
        // fabric.util.animate({
        //     startValue: this.canvas.getZoom(),
        //     endValue: zoom,
        //     duration: 300,
        //     onChange: (zoomvalue) => {
        //         this.canvas.zoomToPoint({ x: offsetX, y: offsetY }, zoomvalue)
        //         this.canvas.renderAll()
        //     },
        //     // onComplete: () => {
        //     //     // opt.e.preventDefault()
        //     //     // opt.e.stopPropagation()
        //     //     this.canvas.renderAll()
        //     // },
        // })
    }

    move(
        deltaX: number,
        deltaY: number,
    ) {
        this.canvas.relativePan({ x: -deltaX, y: -deltaY })
    }

    setSize() {
        this.canvas.setWidth(document.body.clientWidth)
        this.canvas.setHeight(document.body.clientHeight)
        window.addEventListener('resize', () => {
            this.canvas.setWidth(document.body.clientWidth)
            this.canvas.setHeight(document.body.clientHeight)
        })
    }
}
