/* eslint-disable max-classes-per-file */
import {
    describe, test, expect, jest,
} from '@jest/globals'

import { Workspace } from '..'
import { HasState } from '../decorators/has-state'
import { Controller } from '../decorators/controller'
import { Service } from '../decorators/service'
import { Canvas } from '../decorators/canvas'
import { Action } from '../decorators/action'
import { Event } from '../decorators/event'
import { EventEmmiter } from '../decorators/event-emmiter'
import { On } from '../decorators/on'
import { DrawService } from '../services/draw-service'
import { State } from '../decorators/state'

const mockFnForCheckInjectService = jest.fn()
const mockFnForCheckParmetryDecorator = jest.fn()
const mockFnForMouseDown = jest.fn()
const mockFnForEventEmmiter = jest.fn()
const mockFnForHasState = jest.fn()
const mockFnForHasStateNotExecute = jest.fn()

@Service()
class ListService {
    private array: string[] = []

    add(value: string) {
        this.array.push(value)
    }

    getAll() {
        return this.array
    }
}

@Service()
class ListService2 {
    private array: string[] = []

    constructor(
        private list: ListService,
        @Canvas() private testP: {},
        private drawService: DrawService,
        @State() private state: Map<string, string>,
    ) {
        mockFnForCheckParmetryDecorator(this.testP)
    }

    add(value: string) {
        this.array.push(value)
    }

    getAll() {
        return this.array
    }

    saveToState() {
        this.state.set('KEY', 'VALUE')
    }
}

@Controller()
class OwnController {
    constructor(
        private list: ListService,
        private list2: ListService2,
    ) {
        this.list.add('foo')
        this.list.add('bar')
        this.list.add('buz')

        mockFnForCheckInjectService(this.list.getAll())
    }

    @Action('mouse:down')
    onHandler(
        @Event() e: Event,
        @Canvas() cnvs: {},
        @EventEmmiter() event: any,
    ) {
        event.emit('EVENT', 'PAYLOAD')
        this.list2.saveToState()
        mockFnForMouseDown()
    }

    @Action('mouse:down')
    @HasState('KEY', 'VALUE')
    onMousedownHandler() {
        mockFnForHasState()
    }

    @Action('mousedown')
    @HasState('KEY', 'VALUE_UNKNOWN')
    onMousedownErrorHandler() {
        mockFnForHasStateNotExecute()
    }

    @On('EVENT')
    onEventEmmiter(a: string) {
        mockFnForEventEmmiter(a)
    }
}

describe('Workspace', () => {
    const canvasElement = document.createElement('canvas')
    document.body.append(canvasElement)
    const workspace = new Workspace(canvasElement, [
        {
            services: [ListService, ListService2],
            controllers: [OwnController],
        },
    ])
    // @ts-ignore: because fabricCanvas is private, only for test case
    const { fabricCanvas } = workspace

    test('Check services', () => {
        expect(mockFnForCheckInjectService).toHaveBeenCalled()
        expect(mockFnForCheckInjectService.mock.calls).toEqual([[['foo', 'bar', 'buz']]])
    })

    test('Check action mousedown', () => {
        const ev = new MouseEvent('mousedown', { clientX: 100, clientY: 100 })

        // @ts-ignore
        fabricCanvas.upperCanvasEl.dispatchEvent(ev)

        expect(mockFnForMouseDown).toHaveBeenCalled()
    })

    test('Check event emmiter', () => {
        expect(mockFnForEventEmmiter).toHaveBeenCalled()
        expect(mockFnForEventEmmiter.mock.calls).toEqual([['PAYLOAD']])
    })

    test('Sheck has state', () => {
        const ev = new MouseEvent('mousedown')
        canvasElement.dispatchEvent(ev)
        expect(mockFnForHasState).toHaveBeenCalled()
        expect(mockFnForHasStateNotExecute).not.toHaveBeenCalled()
    })
})
