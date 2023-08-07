import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {generalSlice} from './generalSlice/generalSlice';

const rootReducer = combineReducers({
  general: generalSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
