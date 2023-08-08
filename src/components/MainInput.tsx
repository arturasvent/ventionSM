import React, {useRef, useState} from 'react';
import styled from 'styled-components/native';
import {defaultTheme} from '../theme';
import {EFormName} from '../typescript/static/EForm';
import {KeyboardTypeOptions} from 'react-native';

interface IProps {
  placeholder?: string;
  onBlur?: () => void;
  value?: string;
  onChangeText: () => void;
  secureText?: boolean;
  formName: string;
  isUpdate?: boolean;
  type: KeyboardTypeOptions;
}

const MainInput = ({
  placeholder,
  onChangeText,
  value,
  secureText,
  formName,
  isUpdate,
  type,
}: IProps) => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const isEditable = formName === EFormName.Division && isUpdate;

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
          editable={!isEditable}
          selectTextOnFocus={isEditable}
          isEditable={isEditable}
          keyboardType={type ? type : 'default'}
        />
      </InputWrapper>
    </>
  );
};

export default MainInput;

const TextField = styled.TextInput<{isEditable?: boolean}>`
  height: ${defaultTheme.sizes.input}px;
  background-color: ${defaultTheme.colors.background};
  padding: ${defaultTheme.sizes.getSpacing(2)}px;
  font-size: ${defaultTheme.font.size.md}px;
  width: 100%;
  color: ${({isEditable}) =>
    !isEditable ? defaultTheme.colors.text : defaultTheme.colors.placeholder};
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
