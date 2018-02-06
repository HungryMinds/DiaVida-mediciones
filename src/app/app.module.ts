import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// App Imports
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import {
  MatInputModule,
  MatIconModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonModule,
  MatCardModule,
  MatTabsModule,
  MatExpansionModule,
  MatTableModule,
  MatRadioModule
} from '@angular/material';

import { environment } from '../environments/environment';
import { NotfoundComponent } from './notfound/notfound.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgcFloatButtonModule } from 'ngc-float-button';
import { CamperdetailComponent } from './camperdetail/camperdetail.component';

import { CoreModule } from './core';
import { InjectionComponent } from './injection/injection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CampersListComponent } from './campers-list/campers-list.component';
import { SharedModule } from './shared/shared.module';
import { FoodComponent } from './food/food.component';


@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    InjectionComponent,
    CampersListComponent,
    FoodComponent,
    CamperdetailComponent
  ],

  imports: [
    SharedModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    BrowserModule,
    MatRadioModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),
    BrowserAnimationsModule,
    NgcFloatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    CoreModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatTabsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
