import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {styled} from 'styled-components/native';
import {defaultTheme} from '../theme';
import {FieldType, forms} from '../config/forms';
import {GeneralRatesForm} from '../typescript/generalRates/generalRates';
import {Controller, useForm} from 'react-hook-form';
import MainInput from '../components/MainInput';
import {inputPlaceholders} from '../config/constants';
import {EFormName} from '../typescript/static/EForm';
import {yupResolver} from '@hookform/resolvers/yup';
import MainButton from '../components/MainButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useGeneralRates} from '../hooks/useGeneralRates';

const GeneralRatesScreen = () => {
  const {monthlyHours, employerTaxesRate, exchangeRate} = useSelector(
    (state: RootState) => state.general,
  );
  const {updateRates} = useGeneralRates();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      [EFormName.MonthlyHours]: monthlyHours,
      [EFormName.ExchangeRate]: exchangeRate,
      [EFormName.EmployerTaxesRate]: employerTaxesRate,
    },
    resolver: yupResolver(forms.generalRates.validationSchema),
  });

  const renderInput = useCallback(
    (form: FieldType<GeneralRatesForm>) => {
      return (
        <Controller
          key={form.name}
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <>
              <Label>{inputPlaceholders[form.name]}</Label>
              <MainInput
                placeholder={inputPlaceholders[form.name]}
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
    <SafeArea edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <>{forms.generalRates.fields.map(renderInput)}</>
          <MainButton label="Update" onPress={handleSubmit(updateRates)} />
        </Container>
      </ScrollView>
    </SafeArea>
  );
};

export default GeneralRatesScreen;

const Container = styled.View`
  align-self: center;
  flex: 1;
  width: 400px;
`;

const ErrorText = styled.Text`
  color: ${defaultTheme.colors.error};
  margin-top: ${defaultTheme.sizes.getSpacing(1)}px;
  align-self: flex-start;
`;

const Label = styled.Text`
  margin-top: 10px;
`;

const SafeArea = styled(SafeAreaView)`
  flex: 1;
`;

const ScrollView = styled.ScrollView`
  flex: 1;
`;
