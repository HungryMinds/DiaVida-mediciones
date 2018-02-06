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
import { CampistService } from '../core/services/campist.service';

// Routing Imports
import { AddCamperRoutingModule } from './addcamper.routing';

// Application Imports
import {
  AddCampistaComponent,
  AddCampistaDosisComponent,
  AddCampistaFoodComponent,
  AddCampistaEsquemaComponent
} from './components';
import { SharedModule } from '../shared/shared.module';

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
    SharedModule,
    AddCamperRoutingModule
  ],
  declarations: [
    AddCampistaComponent,
    AddCampistaDosisComponent,
    AddCampistaEsquemaComponent,
    AddCampistaFoodComponent
  ],
  providers: [CampistService],
  exports: [AddCampistaComponent, AddCampistaDosisComponent, AddCampistaEsquemaComponent, AddCampistaFoodComponent]
})
export class AddCamperModule {}
