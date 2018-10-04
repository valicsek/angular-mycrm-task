import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MapService {

    constructor(private http: HttpClient) { }

    /**
     * This function returns the opportunity markers
     */
    getOpportunityMarkers() {
        return this.http.post('http://localhost:1995/getOpportunityMarkers', {});
    }

    /**
     * This function helps to determine the longitude and latitude according to options
     * @param options The specification of the address
     */
    getLonLatByAddress(options: { country: string, postalcode: number, state: any, city: string, street: string }) {
        return this.http.post('http://localhost:1995/getLonLatByAddress', {
            options
        });
    }
}
