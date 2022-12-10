import { fabric } from 'fabric'

import { Service } from '../../workspace/decorators/service'
import { Canvas } from '../../workspace/decorators/canvas'

@Service()
export class CanvasService {
    constructor(
        @Canvas() private canvas: fabric.Canvas,
    ) {}

    selection(value: boolean) {
        this.canvas.selection = value
    }
}
