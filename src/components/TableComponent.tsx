import React, {useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {
  Table,
  Row,
  Cell,
  TableWrapper,
  RowProps,
} from 'react-native-table-component';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import styled from 'styled-components/native';
import {defaultTheme} from '../theme';
import {useNavigation} from '@react-navigation/native';
import {AppScreen} from '../typescript/static/AppScreens';
import {Employee} from '../typescript/redux/generalTypes';

const TableComponent = () => {
  const data = useSelector((state: RootState) => state.general.data);

  const {tableHead} = useSelector((state: RootState) => state.general);

  const navigation = useNavigation<any>();

  const handleOnPress = useCallback(
    (name: string | number, division: string) => {
      navigation.navigate(AppScreen.Registration, {name, division});
    },
    [data],
  );

  const renderButton = useCallback(
    (data: string | number, division: string) => {
      return (
        <ButtonContainer onPress={() => handleOnPress(data, division)}>
          <EmployeeName>{data}</EmployeeName>
        </ButtonContainer>
      );
    },
    [],
  );

  const renderTableData = useCallback(
    (division: string) => {
      const filteredEmployees = data[division]?.employees?.map(
        (item: Employee[]) => item,
      );

      const mappedArray = filteredEmployees?.map((obj: Employee) => [
        obj.fullName,
        obj.jobPosition,
        obj.rate1,
        obj.comission1,
        obj.sumComission1,
        obj.rate2,
        obj.comission2,
        obj.sumComission2,
        obj.revenue,
        obj.salary,
        obj.salaryUSD,
        obj.employerTaxes,
        obj.CM1,
        obj.CM1comission,
        obj.CM2,
        obj.CM2comission,
      ]);

      return (
        filteredEmployees.length > 0 && (
          <TableContainer>
            <DivisionTitle>{division}</DivisionTitle>
            <Table borderStyle={{borderWidth: 1, borderColor: '#D7CAA5'}}>
              <Row
                data={tableHead}
                style={styles.HeadStyle}
                textStyle={styles.TableText}
                widthArr={[
                  150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150,
                  150, 150, 150, 150,
                ]}
              />
              {mappedArray?.map(
                (rowData: string[] | number[], rowIndex: number) => (
                  <TableWrapper key={rowIndex} style={styles.row}>
                    {rowData?.map((cellData, cellIndex) => (
                      <Cell
                        key={cellIndex}
                        data={
                          cellIndex === 0
                            ? renderButton(cellData, division)
                            : cellData
                        }
                        width={150}
                        style={{
                          alignItems: 'center',
                        }}
                      />
                    ))}
                  </TableWrapper>
                ),
              )}
            </Table>
          </TableContainer>
        )
      );
    },
    [data],
  );

  return (
    <Wrapper>
      <Container>
        <>{Object.keys(data).map(renderTableData)}</>
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
  },
  TableText: {
    fontSize: 12,
    margin: 5,
    textAlign: 'center',
  },

  row: {flexDirection: 'row', backgroundColor: defaultTheme.colors.background},
  text: {margin: 5, textAlign: 'center'},

  btn: {width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2},
  btnText: {textAlign: 'center', color: '#fff'},
});

const Container = styled.ScrollView`
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
