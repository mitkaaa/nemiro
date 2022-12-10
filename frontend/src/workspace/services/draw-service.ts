import { Ctx } from '../decorators/ctx'
import { Service } from '../decorators/service'

@Service()
export class DrawService {
    constructor(@Ctx() private ctx: CanvasRenderingContext2D) {
        // console.log('Create DrawService')
    }
}
