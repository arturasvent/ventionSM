import React, {useCallback, useEffect} from 'react';
import {styled} from 'styled-components/native';
import {defaultTheme} from '../theme';
import {FieldType, forms} from '../config/forms';
import {useForm, Controller} from 'react-hook-form';
import MainInput from '../components/MainInput';
import {EFormName} from '../typescript/static/EForm';
import {EmployeeForm} from '../typescript/employee/employee';
import {yupResolver} from '@hookform/resolvers/yup';
import {inputPlaceholders} from '../config/constants';
import MainButton from '../components/MainButton';
import {useEmployees} from '../hooks/useEmployees';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigation';
import {AppScreen} from '../typescript/static/AppScreens';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Employee} from '../typescript/redux/generalTypes';

interface Props
  extends NativeStackScreenProps<RootStackParamList, AppScreen.Registration> {}

const RegistrationScreen = ({route, navigation}: Props) => {
  const employeesData = useSelector(
    (state: RootState) => state.general.data[route.params?.division]?.employees,
  );
  const employeeToUpdate = employeesData?.find(
    (item: Employee) => item.fullName === route.params?.name,
  );

  const {addEmployee, removeEmployee, updateInformation} = useEmployees();

  useEffect(() => {
    navigation.setOptions({
      title: employeeToUpdate ? 'Update employee' : 'Register employee',
    });
  }, []);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      [EFormName.Name]: employeeToUpdate ? employeeToUpdate.name : '',
      [EFormName.LastName]: employeeToUpdate ? employeeToUpdate.lastName : '',
      [EFormName.Comission1]: employeeToUpdate
        ? employeeToUpdate.comission1
        : '',
      [EFormName.Comission2]: employeeToUpdate
        ? employeeToUpdate.comission2
        : '',
      [EFormName.Division]: employeeToUpdate ? employeeToUpdate.division : '',
      [EFormName.JobPosition]: employeeToUpdate
        ? employeeToUpdate.jobPosition
        : '',
      [EFormName.Positions]: employeeToUpdate ? employeeToUpdate.positions : '',
      [EFormName.Rate1]: employeeToUpdate ? employeeToUpdate.rate1 : '',
      [EFormName.Rate2]: employeeToUpdate ? employeeToUpdate.rate2 : '',
      [EFormName.Salary]: employeeToUpdate ? employeeToUpdate.salary : '',
    },
    resolver: yupResolver(forms.newEmployee.validationSchema),
  });

  const renderInput = useCallback(
    (form: FieldType<EmployeeForm>) => {
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
                isUpdate={employeeToUpdate?.id ? true : false}
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
          <KeyboardAwareScrollView>
            {forms.newEmployee.fields.map(renderInput)}
          </KeyboardAwareScrollView>
          <MainButton
            label={employeeToUpdate ? 'Update Information' : 'Add new employee'}
            onPress={handleSubmit(
              //@ts-ignore
              employeeToUpdate
                ? data =>
                    updateInformation(data as EmployeeForm, employeeToUpdate.id)
                : addEmployee,
            )}
          />
          {employeeToUpdate && (
            <MainButton
              label="Delete employee"
              onPress={() => removeEmployee(employeeToUpdate)}
              remove
            />
          )}
        </Container>
      </ScrollView>
    </SafeArea>
  );
};

export default RegistrationScreen;

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

const SafeArea = styled(SafeAreaView)`
  flex: 1;
`;

const ScrollView = styled.ScrollView`
  flex: 1;
`;
