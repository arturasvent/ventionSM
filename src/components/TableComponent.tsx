import React, {ReactElement, useCallback} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import styled from 'styled-components/native';
import {defaultTheme} from '../theme';
import {useNavigation} from '@react-navigation/native';
import {AppScreen} from '../typescript/static/AppScreens';
import {Employee} from '../typescript/redux/generalTypes';
import {isArray} from 'lodash';
import AverageCalculationsContainer from './AverageCalculationsContainer';

interface IProps {
  divisionName: string;
  employees: Employee[];
}

const TableComponent = () => {
  const data = useSelector((state: RootState) => state.general.data);

  const {tableHead} = useSelector((state: RootState) => state.general);

  const navigation = useNavigation<any>();

  const handleOnPress = useCallback(
    (employee: Employee) => {
      navigation.navigate(AppScreen.Registration, {employee});
    },
    [data],
  );

  const renderButton = useCallback((employee: Employee) => {
    return (
      <ButtonContainer onPress={() => handleOnPress(employee)}>
        <EmployeeName>{employee.fullName}</EmployeeName>
      </ButtonContainer>
    );
  }, []);

  const DivisionTable = ({divisionName, employees}: IProps) => {
    return (
      <TableContainer>
        <DivisionTitle>{`LT.${divisionName}`}</DivisionTitle>
        <Table>
          <Row
            data={tableHead}
            style={styles.HeadStyle}
            textStyle={styles.TableText}
            widthArr={[
              150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150,
              150, 150, 150,
            ]}
          />
          {employees && renderEmployees(employees)}
        </Table>
        <AverageCalculationsContainer data={employees} />
      </TableContainer>
    );
  };

  const renderEmployees = useCallback((array: Employee[]) => {
    return array.map((employee: Employee) => {
      return (
        <ContainerTest>
          {employee.rowData.map((data: string, index: number) => {
            return (
              <CellTest>
                {index === 0 ? renderButton(employee) : <Text>{data}</Text>}
              </CellTest>
            );
          })}
        </ContainerTest>
      );
    });
  }, []);

  const renderSubdivisions = (subdivisions: any, divisionName = ''): any => {
    const views = [];
    for (const key in subdivisions) {
      if (subdivisions.hasOwnProperty(key)) {
        const subdivision = subdivisions[key];
        const currentDivisionName = divisionName
          ? `${divisionName}.${key}`
          : key;
        if (!isArray(subdivisions[key])) {
          if (subdivision?.employees && subdivision?.employees.length >= 1) {
            views.push(
              <DivisionTable
                key={currentDivisionName}
                divisionName={currentDivisionName}
                employees={subdivision?.employees}
              />,
            );
          }
        }
        if (subdivision.hasOwnProperty('employees')) {
          views.push(renderSubdivisions(subdivision, currentDivisionName));
        }
      }
    }
    return views;
  };

  return (
    <Wrapper>
      <Container showsVerticalScrollIndicator={false}>
        {renderSubdivisions(data?.LT)}
      </Container>
    </Wrapper>
  );
};

export default TableComponent;

const styles = StyleSheet.create({
  HeadStyle: {
    height: 50,
    alignContent: 'center',
    backgroundColor: '#A5A335',
    borderWidth: 0,
    borderColor: '#A5A335',
  },
  TableText: {
    fontSize: 12,
    margin: 5,
    textAlign: 'center',
    borderWidth: 0,
    borderColor: '#A5A335',
  },

  row: {
    flexDirection: 'row',
    backgroundColor: defaultTheme.colors.background,
    borderWidth: 0,
    borderColor: '#A5A335',
  },
  text: {
    margin: 5,
    textAlign: 'center',
    borderWidth: 0,
    borderColor: '#A5A335',
  },

  btn: {width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2},
  btnText: {textAlign: 'center', color: '#fff'},
});

const Container = styled.ScrollView`
  flex: 1;
  padding-horizontal: ${defaultTheme.sizes.getSpacing(10)}px;
  background-color: ${defaultTheme.colors.background};
`;

const Wrapper = styled.View`
  flex-direction: column;
  background-color: ${defaultTheme.colors.background};
  width: 100%;
`;

const DivisionTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-vertical: 10px;
`;
const TableContainer = styled.View`
  margin-bottom: ${defaultTheme.sizes.getSpacing(5)}px;
`;
const ButtonContainer = styled.TouchableOpacity``;

const EmployeeName = styled.Text`
  color: ${defaultTheme.colors.employee};
  margin: 5px;
  text-align: center;
`;

const ContainerTest = styled.View`
  height: 50px;
  flex-direction: row;
  align-items: center;
`;

const CellTest = styled.View`
  width: 150px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-color: #a5a335;
  padding: 3px;
`;
