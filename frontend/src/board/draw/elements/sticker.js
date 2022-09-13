import { createMultilineText, getStringWidth } from '../../../utils/text'
import { darker, luma } from '../../../utils/color'
import { shiftPoint } from '../../../utils/points'
import { MAX_STICKER_WIDTH, STRING_HEIGHT } from '../../../data/constants'
import { state } from '../../../data/state'
import { rect } from '../primitives/rect'
import { text } from '../primitives/text'

const STICKER_OFFSET = 16

export const drawSticker = ([startPoint], string, color) => {
    const lines = createMultilineText(string, MAX_STICKER_WIDTH).split(/[\r\n]/)
    const linesWidth = lines.map(getStringWidth)
    const maxLineWidth = Math.max(...linesWidth)

    const edgePoint = [
        startPoint[0] + Math.min(maxLineWidth, MAX_STICKER_WIDTH),
        startPoint[1] + lines.length * STRING_HEIGHT,
    ]

    rect([
        shiftPoint(startPoint, -STICKER_OFFSET),
        shiftPoint(edgePoint, STICKER_OFFSET),
    ], {
        context: state.canvasContext,
        fillColor: color,
        strokeColor: darker(color),
        lineWidth: 1,
        radius: 4,
        shadow: true,
    })

    text(
        [startPoint],
        string,
        {
            context: state.canvasContext,
            fillColor: luma(color) >= 165 ? '#000000' : '#ffffff',
            maxWidth: MAX_STICKER_WIDTH,
        },
    )
}
