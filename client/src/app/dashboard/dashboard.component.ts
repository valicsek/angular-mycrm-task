import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import { Account } from '../models/account.model';
import { Opportunity } from '../models/opportunity.model';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    /** Variable for determine when to show spinner */
    isLoading = true;
    /** Variable for determine when to show the opportunity spinner */
    isOpportunityDetailsLoading = false;
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
        private authService: AuthService,
        private mapService: MapService
    ) { }

    ngOnInit() {
        this.setupData();
    }

    /**
     * This function logs out the user.
     */
    logOut() {
        this.authService.logOutTheUser();
    }
    /**
     * This function initialize and request necessary services
     */
    private setupData() {

        let account: Account = {
            id: -999,
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
            date_entered: '',
            date_modified: '',
            sales_status: '',
            amount: 0
        }

        this.mapService.getAccounts().subscribe(
            (data: Account[]) => { this.accounts = data, this.isLoading = false },
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
        this.isOpportunityDetailsLoading = true;
        let account_index = event.id();
        if (account_index) {
            this.selectedAccount = this.accounts[account_index];
            this.mapService.getOpportunities(this.selectedAccount.id).subscribe(
                (data: Opportunity[]) => { this.selectedOpportunity = data[data.length - 1]; this.isOpportunityDetailsLoading = false; },
                error => alert('Error during requesting accounts!, Do not forget to run Node.js API')
            );
            // this.selectedOpportunity = this.selectedAccount.opportunities[0];
        }
    }
}
