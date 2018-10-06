import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import { Account } from '../models/account.model';
import { Opportunity } from '../models/opportunity.model';

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
    markers: Opportunity;

    /** This variable contains the selected account */
    selectedAccount = null;
    /** This variable contains the selected opportuniy from the map */
    selectedOpportunity = null;

    constructor(
        private mapService: MapService
    ) { }

    ngOnInit() {
        this.mapService.getOpportunityMarkers().subscribe((data: any) => {
            this.markers = data;
        });

        let account: Account = {
            name: "Account name",
            billing_address_city: "City",
            billing_address_country: "Country",
            billing_address_postalcode: 1234,
            billing_address_state: "State",
            billing_address_street: "Street"
        }

        this.mapService.getLonLatByAddress(account).subscribe((data) => {
            // TODO: Implement the get Longitude latitude address.
        });

    }

    /**
     * Called when user clicks to one marker.
     */
    onMarkerClicked(event) {
        let marker_id = event.id();
        if (marker_id) {
            this.selectedOpportunity = {
                id: marker_id,
                name: "Opportunity name",
                sales_stage: "Sales stage",
                amount: 123 * marker_id
            }
            this.selectedAccount = {
                name: "Account name",
                address: "Country Postal Code City Name Street"
            }
        }
    }
}
