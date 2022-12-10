import { CONTROL_VALUE } from './constant'

import { Service } from '../../workspace/decorators/service'
import { State } from '../../workspace/decorators/state'

@Service()
export class ControlService {
    constructor(
        @State() private state: Map<string, any>,
    ) {}

    setValue(value: string) {
        this.state.set(CONTROL_VALUE, value.toUpperCase())
    }

    reset() {
        const controlsElement = document
            .querySelectorAll<HTMLInputElement>('.typeControls input')
        controlsElement.forEach((control) => {
            control.checked = false
        })

        this.state.set(CONTROL_VALUE, void 0)
    }
}
