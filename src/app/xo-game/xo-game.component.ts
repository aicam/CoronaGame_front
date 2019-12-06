import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Urls} from '../urls';
import {$} from 'protractor';


@Component({
  selector: 'app-xo-game',
  templateUrl: './xo-game.component.html',
  styleUrls: ['./xo-game.component.css']
})
export class XoGameComponent implements OnInit {
  color = 'primary';
  mode = 'determinate';
  PLAYER_COMPUTER = { name: 'Computer', symbol: 'o' };
  PLAYER_HUMAN = { name: 'You', symbol: 'x' };
  DRAW = { name: 'Draw' };
  userFrom: string;
  userTo: string;
  chatroomID: string;
  board: any[];
  currentPlayer = this.PLAYER_HUMAN;
  lastWinner: any;
  gameOver: boolean;
  boardLocked: boolean;
  intervalFunc1: any;
  intervalFunc2: any;
  loseInterval: any;
  winInterval: any;
  shopID: string;
  ScoreAdded = false;
  playerTurn = false;
  Timer = 20;
  timerElement: any;
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.timerElement = document.getElementById('timing');
    this.userFrom = this.route.snapshot.paramMap.get('user1');
    this.userTo = this.route.snapshot.paramMap.get('user2');
    this.chatroomID = this.route.snapshot.paramMap.get('chatroom_id');
    this.shopID = this.route.snapshot.paramMap.get('shop_id');
    this.DRAW.name = this.userTo;
    this.newGame();
  }

  exitbutton() {
    this.http.get(Urls.P_URL + 'decline_competition/' + this.userFrom + '/' + this.userTo + '/' + this.chatroomID).subscribe(response => {
      console.log('a');
    });
    location.replace(Urls.H_URL + 'first_page/' + this.userFrom + '/' + this.shopID);
  }

  loserTimerStart() {
    this.Timer = 20;
    this.loseInterval = setInterval(() => {
      if (this.Timer === 0) {
        this.exitbutton();
      }
      if (!this.playerTurn) {
        clearInterval(this.loseInterval);
      }
      this.timerElement.style.width = this.Timer * 5 + '%';
      this.timerElement.innerHTML = String(this.Timer);
      if (this.Timer > 0) {
        this.Timer -= 1;
      }
      }, 1000);
  }
  winnerTimer() {
    this.Timer = 20;
    this.winInterval = setInterval(() => {
      if (this.Timer === 0 && !this.ScoreAdded) {
        this.http.get(Urls.P_URL + 'add_score/' + this.chatroomID + '/' + this.userTo + '/1').subscribe();
        this.http.get(Urls.P_URL + 'add_score/' + this.chatroomID + '/' + this.userFrom + '/100').subscribe();
        this.lastWinner = this.PLAYER_HUMAN;
        this.gameOver = true;
      }
      if (this.playerTurn) {
        clearInterval(this.winInterval);
      }
      this.timerElement.style.width = this.Timer * 5 + '%';
      this.timerElement.innerHTML = String(this.Timer);
      if (this.Timer > 0) {
        this.Timer -= 1;
      }
    }, 1000);
  }
  square_click(square) {
    this.boardLocked = true;
    this.playerTurn = false;
    this.winnerTimer();
    if (square.value === '' && !this.gameOver) {
      square.value = this.PLAYER_HUMAN.symbol;
      this.http.get(Urls.P_URL + 'xo/move/' + this.userFrom + '/' +
        this.chatroomID + '/' + this.board.indexOf(square)).subscribe(response => {
      });
      this.intervalFunc2 = setInterval(() => {
        if (this.boardLocked) {
          this.http.get(Urls.P_URL + 'xo/get_moves/' + this.userFrom + '/' + this.chatroomID).subscribe(response => {
            const js = JSON.parse(JSON.stringify(response));
            js.map((item, index) => {
              if (this.board[index].value !== item) {
                this.board[index].value = item;
                this.boardLocked = false;
                this.playerTurn = true;
                this.loserTimerStart();
                clearInterval(this.intervalFunc2);
              }
            });
            this.completeMove(this.PLAYER_HUMAN);
            this.completeMove(this.PLAYER_COMPUTER);
          });
        }
      }, 1000);
    } else {
      this.boardLocked = false;
    }
  }

  computerMove(firstMove: boolean = false) {
    this.boardLocked = true;

    setTimeout(() => {
      const square = firstMove ? this.board[4] : this.getRandomAvailableSquare();
      square.value = this.PLAYER_COMPUTER.symbol;
      this.completeMove(this.PLAYER_COMPUTER);
      this.boardLocked = false;
    }, 600);
  }

  completeMove(player) {
    if (this.isWinner(player.symbol)) {
      clearInterval(this.intervalFunc2);
      clearInterval(this.intervalFunc1);
      clearInterval(this.loseInterval);
      clearInterval(this.winInterval);
      this.showGameOver(player);
      if (player.symbol === 'o' && !this.ScoreAdded) {
        this.ScoreAdded = true;
        this.http.get(Urls.P_URL + 'add_score/' + this.chatroomID + '/' + this.userFrom + '/1').subscribe();
      }
      if (player.symbol === 'x' && !this.ScoreAdded) {
        this.ScoreAdded = true;
        this.http.get(Urls.P_URL + 'add_score/' + this.chatroomID + '/' + this.userFrom + '/100').subscribe();
      }
    } else if (!this.availableSquaresExist() && !this.isWinner('x') && !this.isWinner('o')) {
      if (!this.ScoreAdded) {
        clearInterval(this.intervalFunc2);
        clearInterval(this.intervalFunc1);
        clearInterval(this.loseInterval);
        clearInterval(this.winInterval);
        this.ScoreAdded = true;
        this.http.get(Urls.P_URL + 'add_score/' + this.chatroomID + '/' + this.userFrom + '/50').subscribe();
      }
      this.showGameOver(this.DRAW);
    } else {
      this.currentPlayer = (this.currentPlayer === this.PLAYER_COMPUTER ? this.PLAYER_HUMAN : this.PLAYER_COMPUTER);
    }
  }

  availableSquaresExist(): boolean {
    return this.board.filter(s => s.value === '').length > 0;
  }

  getRandomAvailableSquare(): any {
    const availableSquares = this.board.filter(s => s.value === '');
    const squareIndex = this.getRndInteger(0, availableSquares.length - 1);

    return availableSquares[squareIndex];
  }

  showGameOver(winner) {
    this.gameOver = true;
    this.lastWinner = winner;

    if (winner !== this.DRAW) {
      this.currentPlayer = winner;
    }
  }

  static get winningIndexes(): any[] {
    return [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  }

  isWinner(symbol): boolean {
    for (const pattern of XoGameComponent.winningIndexes) {
      const foundWinner = this.board[pattern[0]].value === symbol
        && this.board[pattern[1]].value === symbol
        && this.board[pattern[2]].value === symbol;

      if (foundWinner) {
        for (const index of pattern) {
          this.board[index].winner = true;
        }
        return true;
      }
    }
    return false;
  }

  newGame() {
    this.playerTurn = false;
    this.winnerTimer();
    this.ScoreAdded = false;
    this.board = [
      { value: '' }, { value: '' }, { value: '' },
      { value: '' }, { value: '' }, { value: '' },
      { value: '' }, { value: '' }, { value: '' }
    ];
    this.http.get(Urls.P_URL + 'xo/init_game/' + this.chatroomID).subscribe(response => {
      console.log(response);
      if (response !== this.userFrom) {
        this.boardLocked = true;
        this.intervalFunc1 = setInterval(() => {
            this.http.get(Urls.P_URL + 'xo/get_moves/' + this.userFrom + '/' + this.chatroomID).subscribe(responseS => {
              const js = JSON.parse(JSON.stringify(responseS));
              console.log(js);
              js.map((item, index) => {
                if (item.toString() !== '') {
                  this.playerTurn = true;
                  this.loserTimerStart();
                  this.boardLocked = false;
                  this.board[index].value = 'o';
                  clearInterval(this.intervalFunc1);
                }
              });
            });
        }, 1000);
        setTimeout(() => {
          if (this.boardLocked) {
            // log error in connection
            console.log('error');
          }
        }, 10000);
      } else {
        this.playerTurn = true;
        this.loserTimerStart();
      }
    });
    this.gameOver = false;
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
}
