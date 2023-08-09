import {createSlice} from '@reduxjs/toolkit';
import {Employee, GeneralState} from '../../typescript/redux/generalTypes';

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
  data: {},
  monthlyHours: '168',
  employerTaxesRate: '1.77',
  exchangeRate: '1.09',
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    addNewEmployee: (state, action) => {
      const {division} = action.payload;
      state.data = {
        ...state.data,
        [division]: {
          employees: state.data[division]
            ? [...state.data[division].employees, action.payload]
            : [action.payload],
        },
      };
    },
    deleteEmployee: (state, action) => {
      const {division} = action.payload;
      const filteredArray = state.data[division].employees.filter(
        (employee: Employee) => employee.id !== action.payload.id,
      );

      state.data[division].employees = filteredArray;
    },
    updateEmployee: (state, action) => {
      const {division, index} = action.payload;
      state.data[division].employees[index] = action.payload;
    },
    updateGeneralRates: (state, action) => {
      state.employerTaxesRate = action.payload.employerTaxesRate;
      state.monthlyHours = action.payload.monthlyHours;
      state.exchangeRate = action.payload.exchangeRate;
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
