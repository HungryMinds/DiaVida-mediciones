// Platform imports
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// @Components
import { NotfoundComponent } from './notfound/notfound.component';
import { CamperdetailComponent } from './camperdetail/camperdetail.component';
import { InjectionComponent } from './injection/injection.component';

import { CampersListComponent } from './campers-list/campers-list.component';

const appRoutes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'listado', component: CampersListComponent },
  { path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule' },
  { path: 'camper', loadChildren: 'app/addcamper/addcamper.module#AddCamperModule' },
  { path: 'injection', component: InjectionComponent },
  { path: 'camperDetail/:id', component: CamperdetailComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
