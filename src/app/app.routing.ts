// Platform imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes = [
  // { path: 'requests', loadChildren: 'app/request/request.module#RequestModule' },
  // { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
