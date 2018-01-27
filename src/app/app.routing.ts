// Platform imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// @Components
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';

const appRoutes = [
  // { path: 'requests', loadChildren: 'app/request/request.module#RequestModule' },
  // { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
