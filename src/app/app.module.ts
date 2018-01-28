import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// App Imports
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { NotfoundComponent } from './notfound/notfound.component';

import { NgcFloatButtonModule } from 'ngc-float-button';

@NgModule({
  declarations: [AppComponent, NotfoundComponent],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),
    BrowserAnimationsModule,
    NgcFloatButtonModule,
    // AuthModule,
    // CoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
