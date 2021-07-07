/*import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }*/

import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from './app-routing.module';
//import { Player } from "./game/player.model";
import { GameComponent } from "./game/game.component";
import { environment } from '../environments/environment';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
      ],
        
        //ServiceWorkerModule.register('ngsw-worker.js', {
        //  enabled: environment.production,
          // Register the ServiceWorker as soon as the app is stable
          // or after 30 seconds (whichever comes first).
          //registrationStrategy: 'registerWhenStable:30000'
        //})
    
    //providers: [StoreFirstGuard],
    declarations: [AppComponent, GameComponent],
    bootstrap: [AppComponent]
})

export class AppModule { }
