import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GameComponent } from './game/game.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
      ],
  declarations: [AppComponent,
    GameComponent],
    bootstrap: [AppComponent]
})

export class AppModule { }
