/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

// Platform Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Routing Imports
import { AuthRoutingModule } from './auth.routing';

// Application Imports
import { LoginComponent } from './components';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class AuthModule {}
