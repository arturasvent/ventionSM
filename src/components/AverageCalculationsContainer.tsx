import React from 'react';
import styled from 'styled-components/native';
import {Employee} from '../typescript/redux/generalTypes';

interface Props {
  data: Employee[];
}

const AverageCalculationsContainer = ({data}: Props) => {
  const handleAverage = (key: string) => {
    const arr = data.map(item => Number(item[key as keyof Employee]));
    return arr.reduce((a, b) => a + b) / arr.length;
  };

  const handleAverageCM1 = () => {
    const arr = data.map(item => (item.revenue > 0 ? item.CM1 : null));
    return arr.reduce((a, b) => a! + b!)! / arr.length;
  };

  return (
    <Container>
      <Cell>
        <Text>Average</Text>
      </Cell>
      <Cell></Cell>
      <Cell></Cell>
      <Cell></Cell>
      <Cell></Cell>
      <Cell></Cell>
      <Cell></Cell>
      <Cell></Cell>
      <Cell>
        <Text>${handleAverage('revenue').toFixed(2)}</Text>
      </Cell>
      <Cell>
        <Text>${handleAverage('salary').toFixed(2)}</Text>
      </Cell>
      <Cell>
        <Text>${handleAverage('salaryUSD').toFixed(2)}</Text>
      </Cell>
      <Cell>
        <Text>${handleAverage('employerTaxes').toFixed(2)}</Text>
      </Cell>
      <Cell>
        <Text>${handleAverageCM1()}</Text>
      </Cell>
      <Cell></Cell>
      <Cell>
        <Text>${handleAverage('CM2').toFixed(2)}</Text>
      </Cell>
      <Cell></Cell>
    </Container>
  );
};

export default AverageCalculationsContainer;

const Container = styled.View`
  background-color: #489ee7;
  height: 40px;
  width: 100%;
  flex-direction: row;
`;

const Text = styled.Text`
  font-weight: bold;
`;

const Cell = styled.View`
  width: 150px;
  justify-content: center;
  align-items: center;
  height: 40px;
`;
