import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatTableModule, MatInputModule } from '@angular/material';
// App Imports
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { NotfoundComponent } from './notfound/notfound.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { NgcFloatButtonModule } from 'ngc-float-button';
import { CoreModule } from './core/index';
import { CampersListComponent } from './campers-list/campers-list.component';

@NgModule({
  declarations: [AppComponent, NotfoundComponent, CampersListComponent],
  imports: [
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
