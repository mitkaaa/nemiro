import { workspaceModule } from './modules/workspace/index'
import { elementModule } from './modules/elements-extension/index'
import { Workspace } from './workspace'
import { nodes } from './data/nodes'
import { extensions } from './modules'

import { easterEgg } from './interface/easter-egg'
import { state } from './data/state'
import { getCookie } from './utils/get-cookie'
import { regName } from './interface/reg-name'

import './style.css'
import './interface/controls/style.css'

easterEgg()

state.userName = getCookie(`${state.roomId}:userName`)

regName()

const workspace = new Workspace(nodes.canvasRoot, [
    elementModule,
    workspaceModule,
])

// // import { fabric } from 'fabric'

// const fabricCanvas = new fabric.Canvas('canvas', {
//     selectionLineWidth: 2,
// })

// fabricCanvas.setWidth(1000)
// fabricCanvas.setHeight(1000)

// const rect = new fabric.Rect({
//     left: 0,
//     top: 0,
//     originX: 'left',
//     originY: 'top',
//     width: 150,
//     height: 120,
//     angle: -10,
//     fill: 'rgba(255,0,0,0.5)',
//     // transparentCorners: false,
// })

// fabricCanvas.add(rect)
