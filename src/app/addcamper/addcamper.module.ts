/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

// Platform Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule,
  MatSlideToggleModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from '../shared/navbar/navbar.component';

// Routing Imports
import { AddCamperRoutingModule } from './addcamper.routing';

// Application Imports
import { AddCampistaComponent, AddCampistaDosisComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule,
    AddCamperRoutingModule
  ],
  declarations: [
    NavBarComponent,
    AddCampistaComponent,
    AddCampistaDosisComponent
  ],
  exports: [AddCampistaComponent, AddCampistaDosisComponent]
})
export class AddCamperModule {}
