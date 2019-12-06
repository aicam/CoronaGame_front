import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Urls } from '../urls';
import {ActivatedRoute, Router} from '@angular/router';
import {ajaxGetJSON} from 'rxjs/internal-compatibility';
import set = Reflect.set;
@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }
  username: string;
  username2: string;
  shopID: string;
  usersData: any[] = [];
  closedBool = false;
  competitorSex = false;
  gpOpacity = 1;
  requestToJoin(index): void {
    this.http.get(Urls.P_URL + 'request_competition/' + this.username + '/' + this.usersData[index].username).subscribe(response => {
      console.log(response);
      if (JSON.stringify(response) === '1') {
        this.openForm_v();
      } else if (JSON.stringify(response) === '2') {
        this.openForm_v2();
      } else if (JSON.stringify(response) === '4') {
        this.openForm_v4();
      }
    });
  }
   openForm() {
    document.getElementById('opacity').style.opacity = '0.5';
    const popup = document.getElementById('myForm');
    popup.style.display = 'block';
    popup.classList.toggle('show');
  }
   openForm_v() {
    document.getElementById('opacity').style.opacity = '0.5';
    const popupv = document.getElementById('myForm-v');
    popupv.style.display = 'block';
    popupv.classList.toggle('show');
  }
  openForm_v2() {
    document.getElementById('opacity').style.opacity = '0.5';
    const popupv2 = document.getElementById('myForm-v2');
    popupv2.style.display = 'block';
    popupv2.classList.toggle('show');
  }
  openForm_v4() {
    document.getElementById('opacity').style.opacity = '0.5';
    const popupv4 = document.getElementById('myForm-v4');
    popupv4.style.display = 'block';
    popupv4.classList.toggle('show');
  }

   closeForm() {
     this.http.get(Urls.P_URL + 'decline_competition_start/' + this.username + '/' + this.username2).subscribe(response => {
       console.log('a');
     });
     this.closedBool = true;
     document.getElementById('opacity').style.opacity = '1';
     document.getElementById('myForm').style.display = 'none';
  }

  closeForm_v() {
    document.getElementById('opacity').style.opacity = '1';
    document.getElementById('myForm-v').style.display = 'none';
  }
  closeForm_v2() {
    document.getElementById('opacity').style.opacity = '1';
    document.getElementById('myForm-v2').style.display = 'none';
  }
  closeForm_v4() {
    document.getElementById('opacity').style.opacity = '1';
    document.getElementById('myForm-v4').style.display = 'none';
  }
  acceptCompetition() {
    this.http.get(Urls.P_URL + 'accept_competition/' + this.username2 + '/' + this.username).subscribe(response => {
      if (response.toString() !== 'true') {
        alert('زمان درخواست گذشته');
      }
    });
  }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.shopID = this.route.snapshot.paramMap.get('shopID');
    this.http.get(Urls.P_URL + 'welcome/' + this.username + '/' + this.shopID).subscribe(response => {
      const finalJson = JSON.parse(JSON.stringify(response));
      this.usersData = finalJson;
    });
    let founded = false;
    setInterval(() => {
      this.http.get(Urls.P_URL + 'find_competition/' + this.username).subscribe(response => {
        if (response.toString() !== 'null' && !founded) {
          this.username2 = response.toString();
          this.usersData.forEach((item) => {
            if (item.username === this.username2) {
              this.competitorSex = item.sex;
            }
          });
          founded = true;
          this.openForm();
        }
        if ( response.toString() !== this.username2 && founded || this.closedBool) {
          founded = false;
        }
      });
      this.http.get(Urls.P_URL + 'redirect/' + this.username).subscribe(response => {
        const js = JSON.parse(JSON.stringify(response));
        if (js.user_from !== 'null') {
          if (js.user_from === this.username) {
            this.router.navigateByUrl('/chatroom/' + js.user_from + '/' + js.user_to + '/' + this.shopID);
          } else {
            this.router.navigateByUrl('/chatroom/' + js.user_to + '/' + js.user_from + '/' + this.shopID);
          }
        }
      });
    }, 1500);
    setInterval(() => {
      this.http.get(Urls.P_URL + 'welcome/' + this.username + '/' + this.shopID).subscribe(response => {
        const finalJson = JSON.parse(JSON.stringify(response));
        this.usersData = finalJson;
      });
    }, 5000);
  }

}


