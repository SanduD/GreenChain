import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from '../pages/Login'
import Wallet from '../pages/Wallet'
import TicketScreen from '../pages/Ticket'
import History from '../pages/History'
import Register from '../pages/Register'
import AuthLoadingScreen from '../pages/AuthLoadingScreen'
import { Colors } from '../components/styles'
import DrawerNavigator from './drawer'
import ProfileScreen from '../pages/Profile'
import SettingScreen from '../pages/Setting'
import BillScreen from '../pages/Bill'

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
        initialRouteName="HomeTabs"
      >
        {/* <Stack.Screen
          name="AuthLoading"
          component={AuthLoadingScreen}
          options={{ headerShown: false }}
        />*/}
        {/* <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        /> */}

        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen
          name="History"
          component={History}
          options={{
            headerTitle: 'History 📋',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="BillScreen"
          component={BillScreen}
          options={{
            headerTitle: 'Bills',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="TicketScreen"
          component={TicketScreen}
          options={{
            headerTitle: 'Tickets',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStack
