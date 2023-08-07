import {createSlice} from '@reduxjs/toolkit';
import {GeneralState} from '../../typescript/redux/generalTypes';

const initialState: GeneralState = {
  data: [
    [
      'Arturas',
      'Software developer',
      '20$',
      '5%',
      '0.00',
      '0.00',
      '1000$',
      '0',
    ],
  ],
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    addNewEmployee: (state, action) => {
      state.data = [...state.data, action.payload];
    },
  },
});

export const {addNewEmployee} = generalSlice.actions;
