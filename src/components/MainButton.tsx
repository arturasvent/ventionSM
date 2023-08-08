import React from 'react';
import styled from 'styled-components/native';
import {defaultTheme} from '../theme';

interface IProps {
  label: string;
  onPress: () => void;
  remove?: boolean;
}

const MainButton = ({label, onPress, remove}: IProps) => {
  return (
    <ButtonContainer onPress={onPress} remove={remove}>
      <ButtonText>{label}</ButtonText>
    </ButtonContainer>
  );
};

export default MainButton;

const ButtonContainer = styled.TouchableOpacity<{remove?: boolean}>`
  width: 100%;
  height: ${defaultTheme.sizes.button}px;
  border: 1px solid ${defaultTheme.colors.primary};
  border-radius: ${defaultTheme.roundness.button}px;
  align-items: center;
  background-color: ${({remove}) =>
    remove ? defaultTheme.colors.error : defaultTheme.colors.primary};
  flex-direction: row;
  justify-content: center;
  align-self: center;
  margin-top: ${defaultTheme.sizes.getSpacing(5)}px;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  color: ${defaultTheme.colors.background};
  font-weight: bold;
`;
