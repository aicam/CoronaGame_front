import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChatroomComponent} from './chatroom/chatroom.component';
import {FirstPageComponent} from './first-page/first-page.component';
import {RulesComponent} from './rules/rules.component';
import {GameresultComponent} from './gameresult/gameresult.component';
import {MafiaGameComponent} from './mafia-game/mafia-game.component';
import {XoGameComponent} from './xo-game/xo-game.component';
import {GameSelectionComponent} from './first-page/game-selection/game-selection.component';
import {JortComponent} from './jort/jort.component';

const routes: Routes = [
  {path: 'chatroom/:user1/:user2/:shopID', component: ChatroomComponent},
  {path: 'first_page/:username/:shopID', component: FirstPageComponent},
  {path: 'rules/:shopID/:username' , component: RulesComponent},
  {path: 'gameresult/:game_id/:username/:score/:shopID', component: GameresultComponent},
  {path: 'mafia', component: MafiaGameComponent},
  {path: 'xo/:user1/:user2/:chatroom_id/:shop_id', component: XoGameComponent},
  {path: 'game-selection', component: GameSelectionComponent},
  {path: 'jort', component: JortComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
