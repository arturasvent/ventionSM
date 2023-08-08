import {useCallback} from 'react';
import {SubmitHandler} from 'react-hook-form';
import {EmployeeForm} from '../typescript/employee/employee';
import {useDispatch, useSelector} from 'react-redux';
import {
  addDivision,
  addNewEmployee,
  clearEmployee,
  updateEmployee,
} from '../redux/generalSlice/generalSlice';
import {RootState} from '../redux/store';
import {Employee} from '../typescript/redux/generalTypes';
import {useNavigation} from '@react-navigation/native';
import uuid from 'react-native-uuid';

export const useEmployees = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {employees: employeesData} = useSelector(
    (state: RootState) => state.general,
  );

  const handleForm = useCallback((form: EmployeeForm, employee?: Employee) => {
    return {
      ...form,
      fullName: `${form.name} ${form.lastName}`,
      endComission1: 0,
      endComission2: 0,
      revenue: 0,
      salaryUSD: 0,
      employerTaxes: 0,
      CM1: 0,
      CM1comission: 0,
      CM2: 0,
      CM2comission: 0,
      id: employee?.id ? employee.id : uuid.v4(),
    };
  }, []);
  const addEmployee: SubmitHandler<EmployeeForm> = useCallback(
    form => {
      const newForm = handleForm(form);
      dispatch(addNewEmployee(newForm));
      dispatch(addDivision(form.division));
      navigation.goBack();
    },
    [handleForm, dispatch],
  );

  const updateInformation = useCallback((form: EmployeeForm, id: string) => {
    const employeeToUpdate = employeesData.find(item => item.id === id);

    const index = employeesData.findIndex(i => i.id === employeeToUpdate?.id);

    const newForm = handleForm(form, employeeToUpdate);

    dispatch(
      updateEmployee({
        ...newForm,
        index,
      }),
    );

    navigation.goBack();
  }, []);

  const removeEmployee = useCallback(
    (employee: Employee) => {
      const updatedEmployees = employeesData.filter(
        item => item.id !== employee.id,
      );

      dispatch(clearEmployee(updatedEmployees));

      navigation.goBack();
    },
    [employeesData, clearEmployee],
  );

  return {
    addEmployee,
    removeEmployee,
    updateInformation,
  };
};
