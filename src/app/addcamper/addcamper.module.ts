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
  MatSlideToggleModule,
  MatRadioModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from '../shared/navbar/navbar.component';

// Routing Imports
import { AddCampistaEsquemaComponent } from './components/add-campista-esquema/add-campista-esquema.component';
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
    MatRadioModule,
    AddCamperRoutingModule
  ],
  declarations: [
    NavBarComponent,
    AddCampistaComponent,
    AddCampistaDosisComponent,
    AddCampistaEsquemaComponent
  ],
  exports: [
    AddCampistaComponent,
    AddCampistaDosisComponent,
    AddCampistaEsquemaComponent
  ]
})
export class AddCamperModule {}
