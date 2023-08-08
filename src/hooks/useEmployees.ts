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
import {Alert} from 'react-native';

export const useEmployees = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {employees: employeesData} = useSelector(
    (state: RootState) => state.general,
  );

  const handleForm = useCallback((form: EmployeeForm, employee?: Employee) => {
    const {rate1, rate2, comission1, comission2, salary} = form;
    const sumComission1 = (168 * rate1 * comission1) / 100;
    const sumComission2 = 168 * rate2 * comission2;
    const revenue = ((rate1 + rate2) * 168) / 10;
    const salaryUSD = salary * 1.09;
    const employerTaxes = Number(((salary * 1.09 * 1.77) / 100).toFixed(2));
    const CM1 = Number(
      (
        revenue -
        employerTaxes -
        salaryUSD -
        sumComission1 -
        sumComission2
      ).toFixed(2),
    );
    const CM1comission = revenue > 0 ? ((CM1 / revenue) * 100).toFixed(2) : 0;
    const CM2 = Number(
      (
        revenue -
        employerTaxes -
        salaryUSD -
        sumComission1 -
        sumComission2
      ).toFixed(2),
    );
    const CM2comission =
      revenue > 0 ? ((CM2 / revenue) * 100).toFixed(2) : CM1comission;

    console.log(CM1);

    return {
      ...form,
      fullName: `${form.name} ${form.lastName}`,
      sumComission1,
      sumComission2,
      revenue,
      salaryUSD,
      employerTaxes,
      CM1,
      CM1comission,
      CM2,
      CM2comission,
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

      Alert.alert('Delete employee', 'Are you sure you want to delete?', [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            dispatch(clearEmployee(updatedEmployees));
            navigation.goBack();
          },
        },
      ]);
    },
    [employeesData, clearEmployee],
  );

  return {
    addEmployee,
    removeEmployee,
    updateInformation,
  };
};
