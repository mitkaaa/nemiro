import { state } from '../../data/state'
import { nodes } from '../../data/nodes'
import { getCoordinatesOnWindow } from '../../utils/coords'
import { redrawScreen } from '../draw'

let x = 0
let y = 0
export const trackMoveCanvas = (event) => {
    // console.log(event)
    const nextPoint = getCoordinatesOnWindow(event, 1)
    const nextScrollLeft = Math.floor(state.pointerCaptureCoordinates[0] - nextPoint[0])
    const nextScrollTop = Math.floor(state.pointerCaptureCoordinates[1] - nextPoint[1])

    const tr = this.ctx.getTransform()

    ctx.translate(x - tr.e - nextScrollLeft, y - tr.f - nextScrollTop)
}

export const stopMoveCanvas = () => {
    state.pointerCaptureCoordinates = null
    const ctx = nodes.canvasRoot.getContext('2d')
    x = ctx.getTransform().e
    y = ctx.getTransform().f

    nodes.canvasRoot.removeEventListener('mousemove', trackMoveCanvas)
    nodes.canvasRoot.removeEventListener('mouseup', stopMoveCanvas)
    nodes.canvasRoot.removeEventListener('touchmove', trackMoveCanvas)
    nodes.canvasRoot.removeEventListener('touchend', stopMoveCanvas)
}
