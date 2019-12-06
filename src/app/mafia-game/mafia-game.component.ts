import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-mafia-game',
  templateUrl: './mafia-game.component.html',
  styleUrls: ['./mafia-game.component.css']
})
export class MafiaGameComponent implements OnInit {
  constructor() { }
  @Input() mafia = 0;
  @Input() natasha = 0;
  @Input() shahrvand = 0;
  @Input() doctor = 0;
  @Input() karagah = 0;
  roles = [];
  page = 1;
  maxindex = 0;
  flag = 0;
  @Input() index = 0;
  add_mafia() {
    this.mafia = this.mafia + 1;
  }
  add_natasha() {
    this.natasha = this.natasha + 1;
  }
  add_shahrvand() {
    this.shahrvand = this.shahrvand + 1;
  }
  add_doctor() {
    this.doctor = this.doctor + 1;
  }
  add_karagah() {
    this.karagah = this.karagah + 1;
  }
  min_mafia() {
    if (this.mafia === 0) {
      this.mafia = 0 ;
    } else {
      this.mafia = this.mafia - 1;
    }
  }
  min_natasha() {
    if (this.natasha === 0) {
      this.natasha = 0 ;
    } else {
      this.natasha = this.natasha - 1;
    }
  }
  min_shahrvand() {
    if (this.shahrvand === 0) {
      this.shahrvand = 0 ;
    } else {
      this.shahrvand = this.shahrvand - 1;
    }
  }
  min_doctor() {
    if (this.doctor === 0) {
      this.doctor = 0 ;
    } else {
      this.doctor = this.doctor - 1;
    }
  }
  min_karagah() {
    if (this.karagah === 0) {
      this.karagah = 0 ;
    } else {
      this.karagah = this.karagah - 1;
    }
  }
  shuffle(array) {
    // tslint:disable-next-line:one-variable-per-declaration
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  submitroles() {
    this.page = 2;
    this.maxindex = this.mafia + this.natasha + this.shahrvand + this.doctor + this.karagah ;
    for ( let i = 0; i < this.mafia; i++ ) {
      this.roles.push('mafia');
    }
    for ( let i = 0; i < this.natasha; i++ ) {
      this.roles.push('natasha');
    }
    for ( let i = 0; i < this.shahrvand; i++ ) {
      this.roles.push('shahrvand');
    }
    for ( let i = 0; i < this.doctor; i++ ) {
      this.roles.push('doctor');
    }
    for ( let i = 0; i < this.karagah; i++ ) {
      this.roles.push('karagah');
    }
    this.roles = this.shuffle(this.roles);
  }
  showrole() {
    if (this.roles[this.index] === 'mafia') {
      this.flag = 1;
    }
    if (this.roles[this.index] === 'natasha') {
      this.flag = 2;
    }
    if (this.roles[this.index] === 'shahrvand') {
      this.flag = 3;
    }
    if (this.roles[this.index] === 'doctor') {
      this.flag = 4;
    }
    if (this.roles[this.index] === 'karagah') {
      this.flag = 5;
    }
}
  nextperson() {
    this.index = this.index + 1;
    if (this.index === this.maxindex) {
      this.page = 3;
    } else {
      this.flag = 0;
    }

  }
  ngOnInit() {
  }

}
