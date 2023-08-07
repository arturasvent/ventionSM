import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppScreen} from '../typescript/static/AppScreens';
import HomeScreen from '../screens/HomeScreen';
import RegistrationScreen from '../screens/RegistrationScreen';

export const AppNavigation = () => {
  const Stack = createNativeStackNavigator();

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
          options={{title: 'Registration'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
