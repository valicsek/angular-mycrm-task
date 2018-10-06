import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from './models/account.model';

@Injectable({
    providedIn: 'root'
})
export class MapService {

    constructor(private http: HttpClient) { }

    /**
     * This function returns an array with the longitude and latitude of opportunity markers
     * These opportunity markers based on the following restrictions:
     * - Accounts that have a related open opportunity of 1.000 $ or more (amount >= 1000) on a map. 
     * - An opportunity counts as open when the sales_stage is not 'Closed Won' or 'Closed Lost'.
     * example: {longitude: 1, latitude: 2}
     */
    getOpportunityMarkers() {
        return this.http.post('http://localhost:1995/getOpportunityMarkers', {});
    }

    /**
     * This function helps to determine the longitude and latitude according to options
     * @param options The specification of the address
     */
    getLonLatByAddress(account: Account) {
        return this.http.post('http://localhost:1995/getLonLatByAddress', {
            account
        });
    }
}
