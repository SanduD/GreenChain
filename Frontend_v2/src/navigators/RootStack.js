import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from '../screens/Login'
import Tabs from './tabs'
import Wallet from '../screens/Wallet'
import TransferScreen from '../screens/TransferScreen'
import History from '../screens/History'
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
          headerLeft: () => null,
          headerTintColor: tertiary,
          headerTitle: '',
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
        }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          options={{
            headerShown: false,
            headerLeft: () => null,
          }}
          name="HomeTabs"
          component={Tabs}
        />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="TransferScreen" component={TransferScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStack
