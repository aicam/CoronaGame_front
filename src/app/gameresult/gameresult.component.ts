import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Urls} from '../urls';
import {interval} from 'rxjs';

@Component({
  selector: 'app-gameresult',
  templateUrl: './gameresult.component.html',
  styleUrls: ['./gameresult.component.css']
})
export class GameresultComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private http: HttpClient) { }
  username: string;
  gameID: string;
  score: string;
  shopID: string;
  exitCheck = false;
  yourScore: string;
  competitorScore = 0;
  win = false;
  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.gameID = this.route.snapshot.paramMap.get('game_id');
    this.score = this.route.snapshot.paramMap.get('score');
    this.shopID = this.route.snapshot.paramMap.get('shopID');
    console.log(this.username);
    this.yourScore = this.score;
    this.http.get(Urls.P_URL + 'add_score/' + this.gameID + '/' + this.username + '/' + this.score).subscribe(response => {
      console.log(response);
    });
    setInterval(() => {
      if (!this.exitCheck) {
        this.http.get(Urls.P_URL + 'get_result/' + this.gameID + '/' + this.username).subscribe(response => {
          this.competitorScore = JSON.parse(JSON.stringify(response)).competitor_score;
          if (+this.competitorScore > 0) {
            this.exitCheck = true;
            if (+this.yourScore > +this.competitorScore) {
              this.win = true;
            } else {
              this.win = false;
            }
          }
        });
      }
    }, 3000);
  }
  clicked() {
    window.location.replace(Urls.H_URL + 'first_page/' + this.username + '/' + this.shopID);
  }
}
