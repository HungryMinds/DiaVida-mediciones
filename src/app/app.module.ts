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
  MatButtonModule
} from '@angular/material';

import { environment } from '../environments/environment';
import { NotfoundComponent } from './notfound/notfound.component';
import { NavBarComponent } from './shared/navbar/navbar.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { NgcFloatButtonModule } from 'ngc-float-button';
import { CoreModule } from './core/index';
import { ListadocampistasComponent } from './listadocampistas/listadocampistas.component';

@NgModule({
  declarations: [AppComponent, NotfoundComponent, ListadocampistasComponent],
  imports: [
    BrowserModule,
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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
