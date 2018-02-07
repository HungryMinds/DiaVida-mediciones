// Platform imports
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// App imports
import {
  AddCampistaComponent,
  AddCampistaDosisComponent,
  AddCampistaEsquemaComponent,
  AddCampistaFoodComponent,
  EditCampistaComponent
} from './components';

const addCamperRoutes = [
  { path: 'add-camper', component: AddCampistaComponent },
  { path: 'add-camper/dosis', component: AddCampistaDosisComponent },
  { path: 'add-camper/esquema', component: AddCampistaEsquemaComponent },
  { path: 'add-camper/food', component: AddCampistaFoodComponent },
  { path: 'edit/:id', component: EditCampistaComponent }
];

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, RouterModule.forChild(addCamperRoutes)],
  exports: [RouterModule]
})
export class AddCamperRoutingModule {}
