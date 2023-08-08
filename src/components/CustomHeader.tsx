import {Text} from 'react-native';
import React from 'react';
import {styled} from 'styled-components/native';
import {icons} from '../assets/images';
import {useNavigation} from '@react-navigation/native';
import {AppScreen} from '../typescript/static/AppScreens';

const CustomHeader = () => {
  const navigation = useNavigation<any>();
  return (
    <Container>
      <ImageContainer
        onPress={() => navigation.navigate(AppScreen.Information)}>
        <Image source={icons.info} />
      </ImageContainer>
      <Text>Home</Text>
      <ImageContainer
        onPress={() => navigation.navigate(AppScreen.Registration)}>
        <Image source={icons.add} />
      </ImageContainer>
    </Container>
  );
};

export default CustomHeader;

const Container = styled.View`
  height: 55px;
  border-bottom-width: 0.5px;
  border-color: gray;
  background-color: white;
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ImageContainer = styled.TouchableOpacity``;
const Image = styled.Image`
  height: 25px;
  width: 25px;
  margin-horizontal: 20px;
`;
