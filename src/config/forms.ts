import {TextInputProps} from 'react-native';
import {EFormName, EFormType} from '../typescript/static/EForm';
import {EmployeeForm} from '../typescript/employee/employee';
import {string} from 'yup';
import * as yup from 'yup';

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
}

const RegistrationSchema = yup.object({
  [EFormName.Name]: string().required(`Required`).trim(),
  [EFormName.LastName]: string().required(`Required`).trim(),
  [EFormName.Comission1]: string().required(`Required`).trim(),
  [EFormName.Comission2]: string().required(`Required`).trim(),
  [EFormName.Division]: string().required(`Required`).trim(),
  [EFormName.JobPosition]: string().required(`Required`).trim(),
  [EFormName.Positions]: string().required(`Required`).trim(),
  [EFormName.Rate1]: string().required(`Required`).trim(),
  [EFormName.Rate2]: string().required(`Required`).trim(),
  [EFormName.Salary]: string().required(`Required`).trim(),
});

export const forms: TForms = {
  newEmployee: {
    fields: [
      {
        name: EFormName.Name,
        textContentType: 'name',
      },
      {
        name: EFormName.LastName,
        textContentType: 'name',
      },
      {
        name: EFormName.Division,
        textContentType: 'name',
      },

      {
        name: EFormName.JobPosition,
        textContentType: 'jobTitle',
      },
      {
        name: EFormName.Rate1,
        textContentType: 'name',
      },
      {
        name: EFormName.Comission1,
        textContentType: 'name',
      },
      {
        name: EFormName.Rate2,
        textContentType: 'name',
      },
      {
        name: EFormName.Comission2,
        textContentType: 'name',
      },
      {
        name: EFormName.Salary,
        textContentType: 'name',
      },
      {
        name: EFormName.Positions,
        textContentType: 'name',
      },
    ],
    validationSchema: RegistrationSchema,
  },
};
