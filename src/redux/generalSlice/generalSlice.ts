import {createSlice} from '@reduxjs/toolkit';
import {GeneralState} from '../../typescript/redux/generalTypes';

const initialState: GeneralState = {
  employees: [],
  divisions: [],
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
  monthlyHours: 168,
  employerTaxes: 1.77,
  exangeRate: 1.09,
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    addNewEmployee: (state, action) => {
      state.employees = [...state.employees, action.payload];
    },
    addDivision: (state, action) => {
      const uniq = [...new Set([...state.divisions, action.payload])];
      const allDivisions = [...new Set(uniq)];

      state.divisions = allDivisions;
    },
    clearEmployee: (state, action) => {
      state.employees = action.payload;
    },
    updateEmployee: (state, action) => {
      state.employees[action.payload.index] = action.payload;
    },
  },
});

export const {addNewEmployee, addDivision, clearEmployee, updateEmployee} =
  generalSlice.actions;
