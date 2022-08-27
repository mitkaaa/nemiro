const MAX_STICKER_WIDTH = 160
const scaleMin = 0.5
const scaleMax = 4

const protocol = window.location.protocol === 'http:' ? 'ws:' : 'wss:'
const roomId = window.location.pathname.replace('/room/', '')

const usersRoot = document.getElementById('users')
const canvasRoot = document.getElementById('canvas')
const customColorSelector = document.getElementById('customColor')
const customColorIndicator = document.getElementById('customColorIndicator')
const contextMenu = document.getElementById('contextMenu')
const editContext = document.getElementById('editContext')
const deleteContext = document.getElementById('deleteContext')
const crocodileBtn = document.getElementById('crocodileBtn')
const sapperBtn = document.getElementById('sapperBtn')
const gameField = document.getElementById('gameField')
const timerBtn = document.getElementById('timerBtn')
const timerOutput = document.getElementById('timer')

const canvasContext = canvasRoot.getContext('2d')

canvasContext.font = '16px sans-serif'
canvasContext.textAlign = 'start'
canvasContext.textBaseline = 'top'

customColorIndicator.style.borderColor = customColorSelector.value

let sendDataUpdate = () => {}

let socketTimeoutId = null
let savedElements = []
let savedUsers = []
let timerCounter = 0
let timerTimoutId = null

let tempInputElement = null
let tempInputEditHandler
let tempInputBlurHandler

let pointerCaptureCoordinates = null
let doubleClick = false
let doubleClickTimeoutId = null
let longTouch = false
let longTouchTimeoutId = null

let contextEditHandler
let contextDeleteHandler
let contextMenuOpened = false

let cursorHoveredElements = []
let cursorSelectedElements = []
let cursorSelectedControlPoint = null
let cursorFixedControlPoint = null
let workInProgressElement = null
let selectionFramePoints = null

let imageSize = null

let selectedType = 'pointer'
let selectedColor = '#171717'

let currentScale = 1

let clipboardElements = []

let sapperField = []
