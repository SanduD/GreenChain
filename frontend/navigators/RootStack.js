import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Welcome from '../screens/Welcome';

import { Colors } from '../components/styles';
const { primary, tertiary } = Colors;

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer style={{ flex: 1, backgroundColor: Colors.primary }}>
      <Stack.Navigator
        screenOptions={{
          cardStyle: { backgroundColor: primary },

          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: tertiary,
          //headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
        }}
        initialRouteName="Login"
      >
        {/* <Stack.Screen name="Loginwithphone" component={Loginwithphone} /> */}

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Welcome" component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;