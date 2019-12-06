import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { RulesComponent } from './rules/rules.component';
import { GameresultComponent } from './gameresult/gameresult.component';
import { XoGameComponent } from './xo-game/xo-game.component';
import { MafiaGameComponent } from './mafia-game/mafia-game.component';
import { GameSelectionComponent } from './first-page/game-selection/game-selection.component';
import { JortComponent } from './jort/jort.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule , MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ChatroomComponent,
    FirstPageComponent,
    RulesComponent,
    GameresultComponent,
    XoGameComponent,
    MafiaGameComponent,
    GameSelectionComponent,
    JortComponent
  ],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
