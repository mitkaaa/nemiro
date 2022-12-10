import { Grid } from './grid/grid'
import { WorkspaceController } from './workspace-controller'
import { WorkspaceService } from './workspace-service'

import { Extension } from '../../workspace'

export const workspaceModule: Extension = {
    controllers: [WorkspaceController],
    services: [WorkspaceService, Grid],
}
