import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from '../pages/Login'
import Tabs from './tabs'
import Wallet from '../pages/Wallet'
import TransferScreen from '../pages/Transfer'
import History from '../pages/History'
import Register from '../pages/Register'
import AuthLoadingScreen from '../pages/AuthLoadingScreen'
import { Colors } from '../components/styles'

const { primary, tertiary } = Colors

const Stack = createNativeStackNavigator()

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
          headerTitle: '',
        }}
        initialRouteName="AuthLoading"
      >
        {/* <Stack.Screen
          name="AuthLoading"
          component={AuthLoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Register" component={Register} /> */}
        <Stack.Screen
          name="HomeTabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="TransferScreen" component={TransferScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStack
