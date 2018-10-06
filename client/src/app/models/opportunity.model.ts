export interface Opportunity {
  id: number;
  name: string;
  sales_status: string;
  // TODO: The exercise contains this variable, but the database not???
  sales_stage: string;
  amount: number;
}