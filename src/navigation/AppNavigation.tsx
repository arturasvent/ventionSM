import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppScreen} from '../typescript/static/AppScreens';
import HomeScreen from '../screens/HomeScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import {Employee} from '../typescript/redux/generalTypes';

export type RootStackParamList = {
  [AppScreen.Home]: {};
  [AppScreen.Registration]: {
    name: string;
  };
};

export const AppNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={AppScreen.Home}
          component={HomeScreen}
          options={{
            orientation: 'landscape',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={AppScreen.Registration}
          component={RegistrationScreen}
          options={{title: 'Registration', orientation: 'landscape'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
