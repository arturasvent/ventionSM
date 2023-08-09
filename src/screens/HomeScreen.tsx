import React from 'react';
import CustomHeader from '../components/CustomHeader';
import TableComponent from '../components/TableComponent';
import {styled} from 'styled-components/native';
import {defaultTheme} from '../theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

const HomeScreen = () => {
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: defaultTheme.colors.background}}
      edges={['bottom']}>
      <CustomHeader />
      <VerticalHomeScrollView
        horizontal
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <TableComponent />
      </VerticalHomeScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const VerticalHomeScrollView = styled.ScrollView`
  flex: 1;
  background-color: ${defaultTheme.colors.background};
`;
