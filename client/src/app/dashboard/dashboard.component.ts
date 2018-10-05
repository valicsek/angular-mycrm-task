import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    /** The start latitude of the map */
    latitude = 12;
    /** The start longitude of the map */
    longitude = 23;
    /** The zoom of the map */
    zoom = 3;
    /** This variable contains the markers of the map */
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
