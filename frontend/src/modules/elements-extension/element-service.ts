import { fabric } from 'fabric'

import { Service } from '../../workspace/decorators/service'
import { Canvas } from '../../workspace/decorators/canvas'

@Service()
export class ElementService {
    private temporaryRect: fabric.Rect

    constructor(
        @Canvas() private canvas: fabric.Canvas,
    ) {
        this.temporaryRect = this.createRect({ x: 0, y: 0 }, false, {
            borderOpacityWhenMoving: 0,
            selectable: false,
            evented: false,
            visible: false,
        })
    }

    moveTemporaryRect({ x, y }: { x: number, y: number }) {
        this.temporaryRect.setOptions({ left: x, top: y, visible: true })
        this.canvas.renderAll()
    }

    resetTemporaryRect() {
        this.temporaryRect.setOptions({ visible: false })
    }

    createRect(
        { x, y }: { x: number, y: number },
        active: boolean = true,
        options: {} = {},
    ): fabric.Rect {
        const rect = new fabric.Rect({
            left: x,
            top: y,
            originX: 'left',
            originY: 'top',
            width: 150,
            height: 150,
            fill: 'rgba(150,0,150)',
            transparentCorners: false,
            rx: 20,
            ry: 20,
            ...options,
        })
        if (active) {
            this.canvas.setActiveObject(rect)
        }

        this.canvas.add(rect)
        return rect
    }

    setSizeActiveObject(
        { width, height, ...options }:
        { width: number, height: number, [k: string]: any },
    ) {
        const object = this.canvas.getActiveObject()

        object.set({
            width,
            height,
            ...options,
        })
        this.canvas.renderAll()
    }
}
