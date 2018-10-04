import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  latitude = 12;
  longitude = 23;
  markers = [];

  constructor() { }

  ngOnInit() {
    this.markers.push({
      longitude: 24,
      latitude: 14
    })
    this.markers.push({
      longitude: 56,
      latitude: 14
    })
  }

}
