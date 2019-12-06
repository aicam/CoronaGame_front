import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {
 username: string;
 shopID: string;
 rulesPage = true;
  constructor(private router: Router, private route: ActivatedRoute ) { }

  clicked_rule_submit() {
    this.rulesPage = false;
  }
  clicked() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.shopID = this.route.snapshot.paramMap.get('shopID');
    this.router.navigateByUrl('/first_page/' + this.username + '/' + this.shopID);
  }
  ngOnInit() {
  }

}
