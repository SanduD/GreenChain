import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ProfileScreen from '../pages/Profile'
import LogoutScreen from '../pages/Logout'
import Tabs from './tabs'
import { Colors } from '../components/styles'
import CustomDrawer from '../components/CustomDrawer'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../constants'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: COLORS.primary,
        drawerActiveTintColor: COLORS.secondary,
        drawerInactiveTintColor: COLORS.secondary,
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Tabs}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={LogoutScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Wallet"
        component={LogoutScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="wallet" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
