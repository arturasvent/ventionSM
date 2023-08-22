import {useCallback} from 'react';
import {SubmitHandler} from 'react-hook-form';
import {
  recalculateEmployeesData,
  updateGeneralRates,
} from '../redux/generalSlice/generalSlice';
import {GeneralRatesForm} from '../typescript/generalRates/generalRates';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {Employee} from '../typescript/redux/generalTypes';
import {useNavigation} from '@react-navigation/native';

export const useGeneralRates = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation<any>();

  const data = useSelector((state: RootState) => state.general.data);

  const updateRates: SubmitHandler<GeneralRatesForm> = useCallback(
    form => {
      const {monthlyHours, exchangeRate, employerTaxesRate} = form;

      const updatedRatesArray = Object.keys(data).map(division => {
        const filteredEmployees = data[division]?.employees?.map(
          (item: Employee[]) => item,
        );

        const recalculatedEmployeesData = filteredEmployees.map(
          (employee: Employee) => {
            const {rate1, rate2, comission1, comission2, salary} = employee;
            const sumComission1 =
              (Number(monthlyHours) * rate1 * comission1) / 100;
            const sumComission2 = Number(monthlyHours) * rate2 * comission2;
            const revenue = ((rate1 + rate2) * Number(monthlyHours)) / 10;
            const salaryUSD = Number(
              (salary * Number(exchangeRate)).toFixed(2),
            );
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
            const CM1comission =
              revenue > 0 ? ((CM1 / revenue) * 100).toFixed(2) : 0;
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
              ...employee,
              sumComission1,
              sumComission2,
              revenue,
              salaryUSD,
              employerTaxes,
              CM1,
              CM1comission,
              CM2,
              CM2comission,
            };
          },
        );

        return {
          [division]: {
            employees: [...recalculatedEmployeesData],
          },
        };
      });

      const updatedRatesObject = {};

      for (const item of updatedRatesArray) {
        const key = Object.keys(item)[0];

        //@ts-ignore
        updatedRatesObject[key] = item[key];
      }

      dispatch(updateGeneralRates(form));
      dispatch(recalculateEmployeesData(updatedRatesObject));

      navigation.goBack();
    },

    [dispatch],
  );

  return {
    updateRates,
  };
};
