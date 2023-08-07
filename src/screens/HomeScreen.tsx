import React from 'react';
import CustomHeader from '../components/CustomHeader';
import TableComponent from '../components/TableComponent';
import {styled} from 'styled-components/native';
import {defaultTheme} from '../theme';

const HomeScreen = () => {
  return (
    <HomeContainer showsVerticalScrollIndicator={false}>
      <CustomHeader />
      <HomeScrollView
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}>
        <TableComponent />
      </HomeScrollView>
    </HomeContainer>
  );
};

export default HomeScreen;

const HomeScrollView = styled.ScrollView`
  flex: 1;
  background-color: ${defaultTheme.colors.background};
`;

const HomeContainer = styled.ScrollView`
  flex: 1;
  background-color: ${defaultTheme.colors.background};
`;
