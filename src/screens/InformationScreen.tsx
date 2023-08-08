import {Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {styled} from 'styled-components/native';
import {defaultTheme} from '../theme';
import {FieldType, forms} from '../config/forms';
import {InformationForm} from '../typescript/information/information';
import {Controller, useForm} from 'react-hook-form';
import MainInput from '../components/MainInput';
import {inputPlaceholders} from '../config/constants';
import {EFormName} from '../typescript/static/EForm';
import {yupResolver} from '@hookform/resolvers/yup';

const InformationScreen = () => {
  const {monthlyHours, employerTaxes, exangeRate} = useSelector(
    (state: RootState) => state.general,
  );

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      [EFormName.MonthlyHours]: monthlyHours,
      [EFormName.ExchangeRate]: exangeRate,
      [EFormName.EmployerTaxes]: employerTaxes,
    },
    resolver: yupResolver(forms.newEmployee.validationSchema),
  });

  const renderInput = useCallback(
    (form: FieldType<InformationForm>) => {
      return (
        <Controller
          key={form.name}
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <>
              <MainInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureText={form.secureTextEntry}
                formName={form.name}
                type={form.keyboardType!}
              />
              {errors[form.name]?.message && (
                <ErrorText>{errors[form.name]?.message as EFormName}</ErrorText>
              )}
            </>
          )}
          name={form.name}
        />
      );
    },
    [control, errors],
  );
  return (
    <Container>
      <>{forms.generalInformation.fields.map(renderInput)}</>
    </Container>
  );
};

export default InformationScreen;

const Container = styled.View`
  width: ${defaultTheme.sizes.windowWidth}px;
  align-self: center;
`;

const ErrorText = styled.Text`
  color: ${defaultTheme.colors.error};
  margin-top: ${defaultTheme.sizes.getSpacing(1)}px;
  align-self: flex-start;
`;
