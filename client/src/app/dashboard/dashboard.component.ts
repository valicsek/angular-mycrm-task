import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    latitude = 12;
    longitude = 23;
    markers = [];

    constructor(
        private mapService: MapService
    ) { }

    ngOnInit() {
        this.mapService.getOpportunityMarkers().subscribe((data: any) => {
            this.markers = data;
        });

        let options = {
            country: 'Hungary',
            postalcode: 1234,
            city: 'City',
            street: 'Street name',
            state: 'State'
        };

        this.mapService.getLonLatByAddress(options).subscribe((data) => {
            // TODO: Implement the get Longitude latitude address.
        });

    }

    /**
     * Called when user clicks to one marker.
     */
    onMarkerClicked(event) {
        let marker_id = event.id();
        if (marker_id) {
        }
    }
}
