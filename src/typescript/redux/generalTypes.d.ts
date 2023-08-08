export interface GeneralState {
  employees: Employee[];
  divisions: any;
  tableHead: string[];
}

export interface Employee {
  fullName: string;
  division: string;
  jobPosition: string;
  rate1: string;
  comission1: string;
  rate2: string;
  comission2: string;
  salary: string;
  positions: string;
  endComission1: string;
  endComission2: string;
  revenue: string;
  salary: string;
  salaryUSD: string;
  employerTaxes: string;
  CM1: string;
  CM1comission: string;
  CM2: string;
  CM2comission: string;
  name: string;
  lastName: string;
  id: string;
}
