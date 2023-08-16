export interface GeneralState {
  tableHead: string[];
  monthlyHours: string;
  employerTaxesRate: string;
  exchangeRate: string;
  data: any;
  testDivisions: any;
}

export interface Employee {
  fullName: string;
  division: string;
  jobPosition: string;
  rate1: number;
  comission1: number;
  rate2: number;
  comission2: number;
  salary: number;
  positions: number;
  sumComission1: number;
  sumComission2: number;
  revenue: number;
  salary: number;
  salaryUSD: number;
  employerTaxes: number;
  CM1: number;
  CM1comission: number;
  CM2: number;
  CM2comission: number;
  name: number;
  lastName: string;
  id: string;
}
