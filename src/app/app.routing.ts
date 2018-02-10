// Platform imports
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// @Components
import { NotfoundComponent } from './notfound/notfound.component';
import { CamperdetailComponent } from './camperdetail/camperdetail.component';
import { InjectionComponent } from './injection/injection.component';
import { CampersListComponent } from './campers-list/campers-list.component';
import { FoodComponent } from './food/food.component';
import { MeasurementComponent } from './measurement/measurement.component';

const appRoutes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'listado', component: CampersListComponent },
  { path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule' },
  {
    path: 'camper',
    loadChildren: 'app/addcamper/addcamper.module#AddCamperModule'
  },
  { path: 'camperDetail/:id', component: CamperdetailComponent },
  { path: 'camperDetail/:id/injection', component: InjectionComponent },
  { path: 'camperDetail/:id/food', component: FoodComponent },
  { path: 'camperDetail/:id/measurement', component: MeasurementComponent },
  { path: 'camperDetail/:id/injection/:idInjection', component: InjectionComponent },
  { path: 'camperDetail/:id/measurement/:idMeasurement', component: MeasurementComponent },
  { path: 'camperDetail/:id/food/:idFood', component: FoodComponent },

  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
