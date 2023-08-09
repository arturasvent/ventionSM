import {useCallback} from 'react';
import {SubmitHandler} from 'react-hook-form';
import {EmployeeForm} from '../typescript/employee/employee';
import {useDispatch, useSelector} from 'react-redux';
import {
  addNewEmployee,
  deleteEmployee,
  updateEmployee,
  updateGeneralRates,
} from '../redux/generalSlice/generalSlice';
import {RootState} from '../redux/store';
import {Employee} from '../typescript/redux/generalTypes';
import {useNavigation} from '@react-navigation/native';
import uuid from 'react-native-uuid';
import {Alert} from 'react-native';

export const useEmployees = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const allDivisions = useSelector((state: RootState) => state.general.data);

  const {monthlyHours, employerTaxesRate, exchangeRate} = useSelector(
    (state: RootState) => state.general,
  );

  const handleFormCalculations = useCallback(
    (form: EmployeeForm, employee?: Employee) => {
      const {rate1, rate2, comission1, comission2, salary} = form;
      const sumComission1 = (Number(monthlyHours) * rate1 * comission1) / 100;
      const sumComission2 = Number(monthlyHours) * rate2 * comission2;
      const revenue = ((rate1 + rate2) * Number(monthlyHours)) / 10;
      const salaryUSD = Number((salary * Number(exchangeRate)).toFixed(2));
      const employerTaxes = Number(
        (
          (salary * Number(exchangeRate) * Number(employerTaxesRate)) /
          100
        ).toFixed(2),
      );
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
    },
    [],
  );
  const addEmployee: SubmitHandler<EmployeeForm> = useCallback(
    form => {
      const newForm = handleFormCalculations(form);
      dispatch(addNewEmployee(newForm));
      navigation.goBack();
    },
    [handleFormCalculations, dispatch],
  );

  const updateInformation = useCallback((form: EmployeeForm, id: string) => {
    const employeesByDivision = allDivisions[form.division]?.employees;

    const employeeToUpdate = employeesByDivision.find(
      (item: Employee) => item.id === id,
    );

    const index = employeesByDivision.findIndex(
      (i: Employee) => i.id === employeeToUpdate?.id,
    );

    const newForm = handleFormCalculations(form, employeeToUpdate);

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
      const employeesByDivision = allDivisions[employee.division]?.employees;

      const employeeToDelete = employeesByDivision.find(
        (item: Employee) => item.id === employee.id,
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
            dispatch(deleteEmployee(employeeToDelete));
            navigation.goBack();
          },
        },
      ]);
    },
    [dispatch],
  );

  return {
    addEmployee,
    removeEmployee,
    updateInformation,
  };
};
