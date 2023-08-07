import React from 'react';
import {StyleSheet} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import styled from 'styled-components/native';
import {defaultTheme} from '../theme';

const TableComponent = () => {
  const HeadTable = [
    'Name',
    'Job title',
    'Rate #1',
    'Comission %#1',
    'Comission #1',
    'Rate #2',
    'Comission %#2',
    'Comission #2',
    'Revenue',
    `Salary`,
    'Salary USD',
    'Employer taxes',
    'CM1',
    'CM1 %',
    'CM2',
    'CM2 %',
    'Positions',
  ];

  const DataTable = useSelector((state: RootState) => state.general.data);
  return (
    <Wrapper style={{flexDirection: 'column'}}>
      <TableContainer>
        <DivisionTitle>LT.DIV1.D1.G2</DivisionTitle>
        <Table borderStyle={{borderWidth: 1, borderColor: '#D7CAA5'}}>
          <Row
            data={HeadTable}
            style={styles.HeadStyle}
            textStyle={styles.TableText}
          />
          <Rows data={DataTable} textStyle={styles.TableText} />
        </Table>
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
`;

const DivisionTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  align-self: center;
  margin-vertical: 10px;
`;
