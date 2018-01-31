// Platform imports
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// App imports
import { AddCampistaComponent } from './components';

const addCamperRoutes = [
  { path: 'add-camper', component: AddCampistaComponent }
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(addCamperRoutes)
  ],
  exports: [RouterModule]
})
export class AddCamperRoutingModule {}
