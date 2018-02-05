import { NgModule } from '@angular/core';
import { CampistService } from './services';
import { LogFoodService } from './services';
import { LogInjectionService } from './services';
import { LogMeditionService } from './services';

@NgModule({
  providers: [
    CampistService,
    LogFoodService,
    LogInjectionService,
    LogMeditionService
  ]
})
export class CoreModule { }
