import {useCallback} from 'react';
import {SubmitHandler} from 'react-hook-form';
import {NewEmployeeForm} from '../typescript/employee/employee';
import {useDispatch} from 'react-redux';
import {addNewEmployee} from '../redux/generalSlice/generalSlice';

export const useEmployees = () => {
  const dispatch = useDispatch();
  const addEmployee: SubmitHandler<NewEmployeeForm> = useCallback(form => {
    const arr = [
      `${form.name} ${form.lastName} `,
      form.jobPosition,
      form.rate1,
      form.comission1,
      form.rate2,
      form.comission2,
      form.salary,
      form.positions,
    ];

    dispatch(addNewEmployee(arr));
  }, []);

  return {
    addEmployee,
  };
};
