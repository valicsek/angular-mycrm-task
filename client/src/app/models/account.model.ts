import { Opportunity } from "./opportunity.model";

export interface Account {
  id: number;
  name: string;
  billing_address_street: string;
  billing_address_city: string;
  billing_address_state: string;
  billing_address_postalcode: number;
  billing_address_country: string;
  longitude: number;
  latitude: number;
  opportunities: Opportunity[]
}