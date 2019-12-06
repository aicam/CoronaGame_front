import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Urls} from '../urls';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }
  userFrom: string;
  message: string;
  userTo: string;
  chatMessages: any[];
  chatroomID: string;
  gameID: string;
  shopID: string;
  clicked_report() {
    this.http.get(Urls.P_URL + 'decline_competition/' + this.userFrom + '/' + this.userTo + '/' + this.chatroomID).subscribe(response => {
      console.log('a');
    });
    window.location.replace(Urls.H_URL + 'first_page/' + this.userFrom + '/' + this.shopID);
  }
  getGameUrl(gameId) {
    if (gameId !== 4) {
      return Urls.G_URL + gameId + '/?username='
        + this.userFrom + '&game_id=' + this.chatroomID + '&shop_id=' + this.shopID;
    } else {
      return Urls.H_URL + 'xo/' + this.userFrom + '/' + this.userTo + '/' + this.chatroomID + '/' + this.shopID;
    }
  }
  ngOnInit() {
    this.userFrom = this.route.snapshot.paramMap.get('user1');
    this.userTo = this.route.snapshot.paramMap.get('user2');
    this.shopID = this.route.snapshot.paramMap.get('shopID');
    this.http.get(Urls.P_URL + 'new_chatroom/' + this.userFrom + '/' + this.userTo).subscribe(response => {
      this.chatroomID = response.toString();
      console.log(response);
    });
    setInterval(() => {
      this.http.get(Urls.P_URL + 'receive_chat/' + this.userFrom + '/' + this.userTo + '/' + this.chatroomID).subscribe(response => {
        const responseJs = JSON.parse(JSON.stringify(response));
        this.chatMessages = responseJs.output;
        console.log(responseJs.game_redirect);
        if (responseJs.game_redirect !== 0) {
          location.replace(this.getGameUrl(parseInt(responseJs.game_redirect, 10)));
        }
      });
    }, 1000);
  }
  start_game(i) {
    console.log(Urls.P_URL + 'new_competition/' + this.chatroomID + '/' + this.userFrom);
    this.http.get(Urls.P_URL + 'new_competition/' + this.chatroomID + '/' + this.userFrom).subscribe(response => {
      this.gameID = response.toString();
      window.location.replace(this.getGameUrl(parseInt(this.gameID, 10)));
    });
  }
  delay_s(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  start_typing() {
    document.getElementById('main-chat-div').style.marginBottom = '20px';
  }
  finished_typing() {
    document.getElementById((this.chatMessages.length - 1).toString()).scrollIntoView();
  }
  sendMessage() {
    console.log(this.message);
    this.http.post(Urls.P_URL + 'send_message/' + this.userFrom + '/' + this.userTo +
      '/' + this.chatroomID, this.message).subscribe(response => {
      this.chatMessages.push({from: this.userFrom, time_passed: 0, text: this.message});
      this.message = '';
      this.delay_s(500).then(() => {
        document.getElementById((this.chatMessages.length - 1).toString()).scrollIntoView();
      });
    });
  }

}
