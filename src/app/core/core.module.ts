import { NgModule } from '@angular/core';
import { CampistService } from './services/campist.service';
import { LogFoodService } from './services/log-food.service';
import { LogInjectionService } from './services/log-injection.service';
import { LogMeditionService } from './services/log-medition.service';

@NgModule({
  providers: [
    CampistService,
    LogFoodService,
    LogInjectionService,
    LogMeditionService
  ]
})
export class CoreModule {}
