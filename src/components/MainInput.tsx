import React, {useRef, useState} from 'react';
import styled from 'styled-components/native';
import {defaultTheme} from '../theme';

interface IProps {
  placeholder?: string;
  onBlur?: () => void;
  value?: string;
  onChangeText: () => void;
  secureText?: boolean;
  formName: string;
}

const MainInput = ({
  placeholder,
  onChangeText,
  value,
  secureText,
  formName,
}: IProps) => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(!isFocused);
  };

  return (
    <>
      <InputWrapper focused={isFocused}>
        <TextField
          placeholder={placeholder}
          //@ts-ignore
          ref={inputRef}
          onChangeText={onChangeText}
          value={value}
          onBlur={handleFocus}
          onFocus={handleFocus}
          secureTextEntry={secureText}
          autoCapitalize="none"
          placeholderTextColor={defaultTheme.colors.placeholder}
        />
      </InputWrapper>
    </>
  );
};

export default MainInput;

const TextField = styled.TextInput`
  height: ${defaultTheme.sizes.input}px;
  background-color: ${defaultTheme.colors.background};
  padding: ${defaultTheme.sizes.getSpacing(2)}px;
  font-size: ${defaultTheme.font.size.md}px;
  width: 100%;
  color: ${defaultTheme.colors.text};
  border-radius: 15px;
`;

const InputWrapper = styled.View<{focused?: boolean}>`
  border-width: 1.5px;
  border-color: ${({focused}) =>
    focused ? defaultTheme.colors.primary : defaultTheme.colors.placeholder};
  border-radius: 15px;
  margin-top: 15px;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const Icon = styled.Image`
  align-self: center;
  margin-horizontal: ${defaultTheme.sizes.getSpacing(2)}px;
`;
