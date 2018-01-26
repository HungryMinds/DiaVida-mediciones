// Platform imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// App imports
import { LoginComponent } from './components';
import { AuthGuard } from '../core/guards/auth.guard';

const authRoutes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
