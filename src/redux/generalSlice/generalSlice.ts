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
    'Positions',
  ],
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
  },
});

export const {addNewEmployee, addDivision} = generalSlice.actions;

// 'LT1.DIV2.G1.D3',
// 'LT1.ZME2.G2.D7',
// 'LT1.EAQ2.G4.D4',
// 'LT1.DIV2.G2.D6',
