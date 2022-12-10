import { fabric } from 'fabric'
import { Canvas, IEvent } from 'fabric/fabric-impl'
import { EventEmitter2 } from 'eventemitter2'

import { container } from './container'
import { Draw } from './draw'
import { DrawService } from './services/draw-service'
import {
    CONTROLLER_DECORATORS,
    CANVAS_DECORATOR,
    CTX_DECORATOR,
    ACTION,
    EVENT_DECORATOR,
    EVENT_EMMITER_DECORATOR,
    EVENT_EMMITER,
    SERVICE_DECORATORS,
    DRAW_DECORATOR,
    STATE_DECORATOR,
    HASSTATE,
} from './constants'
import { Store } from './store'

export type Controller = { new (...args: any[]): any }
export type Service = { new (...args: any[]): any }

export type Extension = {
    services: Service[]
    controllers: Controller[]
}

export class Workspace {
    private canvas: HTMLCanvasElement

    private ctx: CanvasRenderingContext2D

    private fabricCanvas: Canvas

    private state: Map<string, any> = new Map()

    private store: Store = new Store() // Data layer

    private draw: Draw = new Draw() // View layer

    public eventEmmiter: EventEmitter2 = new EventEmitter2({ wildcard: true, delimiter: ':' })

    constructor(canvasElement: HTMLCanvasElement, extensions?: Extension[]) {
        this.fabricCanvas = new fabric.Canvas(canvasElement, {
            selectionLineWidth: 2,
            imageSmoothingEnabled: false,
        })

        container.addParameterDecorator([SERVICE_DECORATORS], CANVAS_DECORATOR, this.fabricCanvas)
        container.addParameterDecorator([SERVICE_DECORATORS], DRAW_DECORATOR, this.draw)
        container.addParameterDecorator(
            [CONTROLLER_DECORATORS, SERVICE_DECORATORS],
            STATE_DECORATOR,
            this.state,
        )
        container.addParameterDecorator(
            [CONTROLLER_DECORATORS],
            EVENT_EMMITER_DECORATOR,
            this.eventEmmiter,
        )

        this.runEventEmmiter()
        this.runExtensions(extensions)
        this.runEvents()

        this.eventEmmiter.emit('INIT')
    }

    runEventEmmiter() {
        this.eventEmmiter.on('*', function (value1, value2) {
            container.getMethodDecorator(
                CONTROLLER_DECORATORS,
                `${EVENT_EMMITER}-${this.event}`,
            )?.forEach((fn) => fn(value1, value2)) // TODO: forEach is a bad idea
        })
    }

    runExtensions(extensions: Extension[] = []) {
        const globalServices = [DrawService] // TODO: REMOVE!!!

        extensions.forEach(({ services, controllers }) => {
            // Add Services in Container of Service
            services.forEach((service) => container.addService(
                service,
                [...services, ...globalServices],
            ))

            // Add Services in Container of Controller
            controllers.forEach((ControllerInstance) => {
                container.addService(ControllerInstance, [...services, ...globalServices])
                new ControllerInstance()
            })
        })
    }

    runEvents() {
        const createEvent = (eventName: string) => (event: IEvent) => {
            // getCoordinates(event)

            container.addParameterDecorator([CONTROLLER_DECORATORS], EVENT_DECORATOR, event)

            const fnsOfHasState: any[] = container
                .getMethodDecorator(CONTROLLER_DECORATORS, HASSTATE) || []

            container.getMethodDecorator(
                CONTROLLER_DECORATORS,
                `${ACTION}-${eventName}`,
            )?.forEach((fn) => {
                const isConditionHasState = fnsOfHasState?.reduce((memo, [stateType, value, f]) => {
                    if (f() === fn() && memo !== 0) {
                        const condition1 = this.state.get(stateType)
                            && this.state.get(stateType) === value
                        const condition2 = !value && this.state.get(stateType)

                        if (condition1 || condition2) {
                            return 1
                        }
                        return 0
                    }
                    return memo
                }, -1)

                // console.log(isConditionHasState)

                if (isConditionHasState) {
                    fn()()
                }
            })
        }

        // ['mousedown', 'touchstart', 'mousemove', 'touchmove', 'mouseup', 'touchend']
        //     .forEach((typeEvent) => this.canvas.addEventListener(typeEvent, createEvent(typeEvent)));

        // TODO: O(n) -> to be O(1)
        ['object:modified', 'object:moving', 'object:scaling', 'object:rotating', 'object:skewing',
            'object:resizing', 'before:transform', 'before:selection:cleared', 'selection:cleared',
            'selection:created', 'selection:updated', 'mouse:up', 'mouse:down', 'mouse:move',
            'mouse:up:before', 'mouse:down:before', 'mouse:move:before', 'mouse:dblclick',
            'mouse:wheel', 'mouse:over', 'mouse:out', 'drop:before', 'drop', 'dragover',
            'dragenter', 'dragleave', 'after:render', 'moving', 'scaling', 'rotating',
            'skewing', 'resizing', 'mouseup', 'mousedown', 'mousemove', 'mouseup:before',
            'mousedown:before', 'mousemove:before', 'mousedblclick', 'mousewheel', 'mouseover',
            'mouseout', 'drop:before', 'drop', 'dragover', 'dragenter', 'dragleave', 'path:created',
            'object:added', 'object:removed', 'before:render']
            .forEach((typeEvent) => this.fabricCanvas.on(typeEvent, createEvent(typeEvent)))

        // this.canvasFabric.on('mouse:up', (e) => {
        //     console.log('mouse:up', e)
        // })
        // this.canvasFabric.on()
        // window.f = this.canvasFabric
    }
}
