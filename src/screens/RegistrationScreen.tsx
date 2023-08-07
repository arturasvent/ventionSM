import React, {useCallback} from 'react';
import {styled} from 'styled-components/native';
import {defaultTheme} from '../theme';
import {ScrollView} from 'react-native';
import {FieldType, forms} from '../config/forms';
import {useForm, Controller} from 'react-hook-form';
import MainInput from '../components/MainInput';
import {EFormName} from '../typescript/static/EForm';
import {NewEmployeeForm} from '../typescript/employee/employee';
import {yupResolver} from '@hookform/resolvers/yup';
import {inputPlaceholders} from '../config/constants';
import MainButton from '../components/MainButton';
import {useEmployees} from '../hooks/useEmployees';
import {SafeAreaView} from 'react-native-safe-area-context';

const RegistrationScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      [EFormName.Name]: '',
      [EFormName.LastName]: '',
      [EFormName.Comission1]: '',
      [EFormName.Comission2]: '',
      [EFormName.Division]: '',
      [EFormName.JobPosition]: '',
      [EFormName.Positions]: '',
      [EFormName.Rate1]: '',
      [EFormName.Rate2]: '',
      [EFormName.Salary]: '',
    },
    resolver: yupResolver(forms.newEmployee.validationSchema),
  });

  const {addEmployee} = useEmployees();

  const renderInput = useCallback(
    (form: FieldType<NewEmployeeForm>) => {
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
                placeholder={inputPlaceholders[form.name]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureText={form.secureTextEntry}
                formName={form.name}
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
    <SafeAreaView style={{flex: 1}} edges={['bottom']}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <Container>
          <>{forms.newEmployee.fields.map(renderInput)}</>
          <MainButton
            label="Add new employee"
            onPress={handleSubmit(addEmployee)}
          />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;

//portrait mode

const Container = styled.View`
  width: ${defaultTheme.sizes.windowWidth - defaultTheme.sizes.appPadding}px;
  align-self: center;
`;

// landscape

// const Container = styled.View`
//   width: ${defaultTheme.sizes.windowWidth / 2}px;
//   border: 1px solid red;
//   align-self: center;
// `;

const ErrorText = styled.Text`
  color: ${defaultTheme.colors.error};
  margin-top: ${defaultTheme.sizes.getSpacing(1)}px;
  align-self: flex-start;
`;
