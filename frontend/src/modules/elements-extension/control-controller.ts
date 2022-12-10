import { ControlService } from './control-service'
import { On } from '../../workspace/decorators/on'
import { Controller } from '../../workspace/decorators/controller'

@Controller()
export class ControlController {
    constructor(private controlService: ControlService) {
        document.querySelectorAll('[name=type]').forEach((control) => {
            control.addEventListener('click', (event: Event) => {
                const target = event.target as HTMLInputElement
                this.controlService.setValue(target.value)
            })
        })
    }

    @On('CONTROL:RESET')
    resetHandler() {
        this.controlService.reset()
    }
}
