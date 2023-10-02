import {createSlice} from '@reduxjs/toolkit';
import {Employee, GeneralState} from '../../typescript/redux/generalTypes';

const initialState: GeneralState = {
  tableHead: [
    'Name',
    'Job title',
    'Rate #1',
    'Comission %#1',
    'Comission #1',
    'Rate #2',
    'Comission %#2',
    'Comission #2',
    'Revenue',
    `Salary`,
    'Salary USD',
    'Employer taxes',
    'CM1',
    'CM1 %',
    'CM2',
    'CM2 %',
  ],
  monthlyHours: '168',
  employerTaxesRate: '1.77',
  exchangeRate: '1.09',
  data: {},
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    addNewEmployee: (state, action) => {
      const divisionParts = action.payload.division.split('.');
      let currentNode = state.data;

      divisionParts.forEach((part: string) => {
        if (!currentNode[part]) {
          currentNode[part] = {
            fullDivisionName: divisionParts
              .slice(0, divisionParts.indexOf(part) + 1)
              .join('.'),
            employees: [],
          };
        }

        currentNode = currentNode[part];
      });

      currentNode.employees.push(action.payload);
    },
    deleteEmployee: (state, action) => {
      const employee = action.payload;

      const search = (divs: any) => {
        for (const key in divs) {
          const division = divs[key];

          if (key !== 'employees' && key !== 'fullDivisionName') {
            search(division);

            division.employees = division.employees.filter(
              (item: Employee) => item.id !== employee.id,
            );
          }
        }
      };

      search(state.data);
    },
    updateEmployee: (state, action) => {
      const {newForm, employee} = action.payload;

      const search = (divs: any) => {
        for (const key in divs) {
          const division = divs[key];

          if (key !== 'employees' && key !== 'fullDivisionName') {
            search(division);

            const findEmployee = division.employees.find(
              (item: Employee) => item.id === employee.id,
            );

            const index = division.employees.indexOf(findEmployee);

            division.employees[index] = newForm;
          }
        }
      };

      search(state.data);
    },
    updateGeneralRates: (state, action) => {
      const {employerTaxesRate, monthlyHours, exchangeRate} = action.payload;
      state.employerTaxesRate = employerTaxesRate;
      state.monthlyHours = monthlyHours;
      state.exchangeRate = exchangeRate;
    },
    recalculateEmployeesData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {
  addNewEmployee,
  deleteEmployee,
  updateEmployee,
  updateGeneralRates,
  recalculateEmployeesData,
} = generalSlice.actions;
