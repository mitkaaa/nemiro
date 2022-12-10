import { fabric } from 'fabric'
import { getCoefficient } from './get-coefficient'

import { Canvas } from '../../../workspace/decorators/canvas'
import { Service } from '../../../workspace/decorators/service'

@Service({ singleton: true })
export class Grid {
    private lineCount: number = 25

    private grid: fabric.StaticCanvas

    private distance: number = 15

    private params: {} = {
        stroke: '#ebebeb',
        strokeWidth: 1,
        selectable: false,
    }

    private lines: [fabric.Line, fabric.Line][] = []

    private zoomPeriod: [number, number] = [0, 0]

    constructor(@Canvas() private canvas: fabric.Canvas) {
        this.grid = new fabric.StaticCanvas('grid', {})
        this.grid.setHeight(this.lineCount * this.distance)
        this.grid.setWidth(this.lineCount * this.distance)

        const gridLen = this.lineCount

        for (let i = 0; i < gridLen; i += 1) {
            const distance = i * this.distance
            const horizontal = new fabric.Line(
                [distance, 0, distance, this.lineCount * this.distance],
                this.params,
            )

            const vertical = new fabric.Line(
                [0, distance, this.lineCount * this.distance, distance],
                this.params,
            )

            this.lines.push([vertical, horizontal])

            this.grid.add(horizontal)
            this.grid.add(vertical)

            if (i % 5 === 0) {
                horizontal.set({ stroke: '#cccccc' })
                vertical.set({ stroke: '#cccccc' })
            }
        }

        this.updateOfZoom(1)
    }

    updateOfZoom(zoom: number) {
        const coefficient = getCoefficient(this.zoomPeriod, zoom, this.distance)

        const distance = coefficient * zoom

        this.grid.setHeight(distance * this.lineCount)
        this.grid.setWidth(distance * this.lineCount)

        this.lines.forEach(([verticalLine, horizontalLine], i) => {
            verticalLine.top = i * distance
            verticalLine.width = distance * this.lineCount
            verticalLine.setCoords()

            horizontalLine.left = i * distance
            horizontalLine.height = distance * this.lineCount
            horizontalLine.setCoords()
        })

        const pattern = new fabric.Pattern({
            // @ts-ignore: fabric.Pattern can have source as HTMLCanvasElement
            source: this.grid.toCanvasElement(),
            repeat: 'repeat',
        })

        pattern.patternTransform = [1 / zoom, 0, 0, 1 / zoom, 400, 400]

        this.canvas.setBackgroundColor(pattern, () => {})
    }

    setZoomPeriod([min, max]: [number, number]) {
        this.zoomPeriod = [min, max]
    }
}
