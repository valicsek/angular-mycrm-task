import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  latitude = 0;
  longitude = 0;

  constructor() { }

  ngOnInit() {
    this.latitude = 12;
    this.longitude = 23;
  }

}
