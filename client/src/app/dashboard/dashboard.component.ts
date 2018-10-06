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
    /** This variable contains the accounts */
    accounts: Account[] = [];
    /** This variable contains the opportunities */
    // opportunities: Opportunity[] = [];
    /** This variable contains the selected account */
    selectedAccount: Account;
    /** This variable contains the selected opportuniy from the map */
    selectedOpportunity: Opportunity;

    constructor(
        private mapService: MapService
    ) { }

    ngOnInit() {
        this.setupData();
    }

    /**
     * This function initialize and request necessary services
     */
    private setupData() {

        let account: Account = {
            account_id: -999,
            name: '',
            billing_address_city: '',
            billing_address_country: '',
            billing_address_postalcode: 0,
            billing_address_state: '',
            billing_address_street: '',
            latitude: 0,
            longitude: 0,
            opportunities: []
        }
        this.selectedAccount = account;

        this.selectedOpportunity = {
            id: -999,
            name: '',
            sales_status: '',
            sales_stage: '',
            amount: 0
        }

        this.mapService.getAccounts().subscribe(
            (data: Account[]) => this.accounts = data,
            error => alert('Error during requesting accounts!, Do not forget to run Node.js API')
        );

        // NOTE: The getAccount backend call contains the opportunities as well.
        // this.mapService.getOpportunities().subscribe(
        //    (data: Opportunity[]) => this.opportunities = data,
        //    error => alert('Error during requesting opportunity markers!, Do not forget to run Node.js API')
        //);

        // this.mapService.getLonLatByAddress(account).subscribe((data) => {
        // TODO: Implement the get Longitude latitude address.
        // });
    }

    /**
     * Called when user clicks to one marker.
     */
    onMarkerClicked(event) {
        let marker_id = event.id();
        if (marker_id) {
            this.selectedAccount = this.accounts.filter(account => account.account_id == marker_id)[0];
            this.selectedOpportunity = this.selectedAccount.opportunities[0];
        }
    }
}
