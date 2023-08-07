import React, {useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import styled from 'styled-components/native';
import {defaultTheme} from '../theme';

const TableComponent = () => {
  const employeesData = useSelector(
    (state: RootState) => state.general.employees,
  );
  const {divisions, tableHead} = useSelector(
    (state: RootState) => state.general,
  );

  const renderItem = useCallback(
    ({item}: any) => {
      const filteredEmployees = employeesData.filter(
        employee => employee.division === item,
      );

      const mappedArray = filteredEmployees.map(obj => [
        `${obj.name} ${obj.lastName} `,
        obj.jobPosition,
        obj.rate1,
        obj.comission1,
        obj.endComission1,
        obj.rate2,
        obj.comission2,
        obj.endComission2,
        obj.revenue,
        obj.salary,
        obj.salaryUSD,
        obj.employerTaxes,
        obj.CM1,
        obj.CM1comission,
        obj.CM2,
        obj.CM2comission,
        obj.positions,
      ]);

      return (
        <>
          <DivisionTitle>{item}</DivisionTitle>
          <Table borderStyle={{borderWidth: 1, borderColor: '#D7CAA5'}}>
            <Row
              data={tableHead}
              style={styles.HeadStyle}
              textStyle={styles.TableText}
            />
            <Rows data={mappedArray} textStyle={styles.TableText} />
          </Table>
        </>
      );
    },
    [employeesData],
  );

  return (
    <Wrapper>
      <TableContainer>
        <FlatList data={divisions} renderItem={renderItem} />
      </TableContainer>
    </Wrapper>
  );
};

export default TableComponent;

const styles = StyleSheet.create({
  HeadStyle: {
    height: 50,
    alignContent: 'center',
    backgroundColor: '#A5A335',
  },
  TableText: {
    margin: 10,
    fontSize: 12,
  },
});

const TableContainer = styled.View`
  flex: 1;
  padding-horizontal: ${defaultTheme.sizes.getSpacing(5)}px;
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
  align-self: center;
  margin-vertical: 10px;
`;
