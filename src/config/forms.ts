import {TextInputProps} from 'react-native';
import {EFormName, EFormType} from '../typescript/static/EForm';
import {EmployeeForm} from '../typescript/employee/employee';
import {string} from 'yup';
import * as yup from 'yup';
import {GeneralRatesForm} from '../typescript/generalRates/generalRates';

export type FieldType<Values, T = TextInputProps> = T & {
  name: keyof Values;
  type?: EFormType;
  label?: string;
  title?: string;
};

type FormType<T> = {
  fields: FieldType<T>[];
  validationSchema?: any;
};

interface TForms {
  newEmployee: FormType<EmployeeForm>;
  generalRates: FormType<GeneralRatesForm>;
}

const RegistrationSchema = yup.object({
  [EFormName.Name]: string().required(`Required`).trim(),
  [EFormName.LastName]: string().required(`Required`).trim(),
  [EFormName.Comission1]: string().required(`Required`).trim(),
  [EFormName.Comission2]: string().required(`Required`).trim(),
  [EFormName.Division]: string().required(`Required`).trim(),
  [EFormName.JobPosition]: string().required(`Required`).trim(),
  [EFormName.Rate1]: string().required(`Required`).trim(),
  [EFormName.Rate2]: string().required(`Required`).trim(),
  [EFormName.Salary]: string().required(`Required`).trim(),
});

const GeneralRatesSchema = yup.object({
  [EFormName.MonthlyHours]: string().required(`Required`).trim(),
  [EFormName.ExchangeRate]: string().required(`Required`).trim(),
  [EFormName.EmployerTaxesRate]: string().required(`Required`).trim(),
});

export const forms: TForms = {
  newEmployee: {
    fields: [
      {
        name: EFormName.Name,
        textContentType: 'name',
        keyboardType: 'default',
      },
      {
        name: EFormName.LastName,
        textContentType: 'name',
        keyboardType: 'default',
      },
      {
        name: EFormName.Division,
        textContentType: 'name',
        keyboardType: 'default',
      },

      {
        name: EFormName.JobPosition,
        textContentType: 'jobTitle',
        keyboardType: 'default',
      },
      {
        name: EFormName.Rate1,
        textContentType: 'name',
        keyboardType: 'number-pad',
      },
      {
        name: EFormName.Comission1,
        textContentType: 'name',
        keyboardType: 'number-pad',
      },
      {
        name: EFormName.Rate2,
        textContentType: 'name',
        keyboardType: 'number-pad',
      },
      {
        name: EFormName.Comission2,
        textContentType: 'name',
        keyboardType: 'number-pad',
      },
      {
        name: EFormName.Salary,
        textContentType: 'name',
        keyboardType: 'number-pad',
      },
    ],
    validationSchema: RegistrationSchema,
  },
  generalRates: {
    fields: [
      {
        name: EFormName.MonthlyHours,
        textContentType: 'name',
      },
      {
        name: EFormName.ExchangeRate,
        textContentType: 'name',
      },
      {
        name: EFormName.EmployerTaxesRate,
        textContentType: 'name',
      },
    ],
    validationSchema: GeneralRatesSchema,
  },
};
