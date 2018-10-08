import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from './models/account.model';

@Injectable({
    providedIn: 'root'
})
export class MapService {

    constructor(private http: HttpClient) { }

    /**
     * This functions returns the opportunities for a selected Account
     */
    getOpportunities(account_id) {
        return this.http.post('http://localhost:1995/getOpportunities', {
            account_id
        });
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

    /**
     * This function returns the Accounts that
     * - Accounts that have a related open opportunity of 1.000 $ or more (amount >= 1000) on a map. 
     */
    getAccounts() {
        return this.http.post('http://localhost:1995/getAccounts', {});
    }
}
