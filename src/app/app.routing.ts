// Platform imports
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// @Components
import { NotfoundComponent } from './notfound/notfound.component';
import { ListadocampistasComponent } from './listadocampistas/listadocampistas.component';
import { CamperdetailComponent } from './camperdetail/camperdetail.component';

const appRoutes = [
  // { path: 'requests', loadChildren: 'app/request/request.module#RequestModule' },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule' },
  {
    path: 'camper',
    loadChildren: 'app/addcamper/addcamper.module#AddCamperModule'
  },
  { path: 'listado', component: ListadocampistasComponent },
  { path: 'camperDetail', component: CamperdetailComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
