import {useCallback} from 'react';
import {SubmitHandler} from 'react-hook-form';
import {NewEmployeeForm} from '../typescript/employee/employee';
import {useDispatch} from 'react-redux';
import {addDivision, addNewEmployee} from '../redux/generalSlice/generalSlice';

export const useEmployees = () => {
  const dispatch = useDispatch();
  const addEmployee: SubmitHandler<NewEmployeeForm> = useCallback(form => {
    const newForm = {
      ...form,
      endComission1: 0,
      endComission2: 0,
      revenue: 0,
      salary: 0,
      salaryUSD: 0,
      employerTaxes: 0,
      CM1: 0,
      CM1comission: 0,
      CM2: 0,
      CM2comission: 0,
    };
    dispatch(addNewEmployee(newForm));
    dispatch(addDivision(form.division));
  }, []);

  return {
    addEmployee,
  };
};
