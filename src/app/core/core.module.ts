/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

// Platform Imports
import { NgModule } from '@angular/core';

// Services Imports
import { SessionService, NotificationService, DialogService } from './services';
import { AuthGuard } from './guards/auth.guard';

// Modules Imports
import { SharedModule } from '../shared';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••         MODULE DEFINITION             •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

@NgModule({
  imports: [SharedModule],
  providers: [SessionService, NotificationService, DialogService, AuthGuard]
})
export class CoreModule {}
