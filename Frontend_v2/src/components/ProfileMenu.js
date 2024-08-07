import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native'
import { icons, COLORS } from '../constants'
import { Colors } from './styles'
import { useLogout } from '../hooks/useLogout'

const menuItems = [
  {
    id: 'profile',
    title: 'Profile',
    icon: require('../assets/icons/user.png'),
  },
  { id: 'wallet', title: 'Wallet', icon: icons.wallet },
  { id: 'help', title: 'Help', icon: icons.info },
  { id: 'logout', title: 'Logout', icon: icons.exit },
]

const ProfileMenu = ({ isVisible, toggleMenu, navigation }) => {
  const { logout } = useLogout()

  const handleMenuItemPress = async item => {
    if (item.id === 'logout') {
      await logout()
      navigation.navigate('Login')
    } else {
      console.log(`${item.title} pressed`)
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu}>
        <Image source={icons.user} style={styles.profileIcon} />
      </TouchableOpacity>
      {isVisible && (
        <View style={styles.menuContainer}>
          <FlatList
            data={menuItems}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => handleMenuItemPress(item)}
              >
                <Image source={item.icon} style={styles.menuIcon} />
                <Text style={styles.menuText}>{item.title}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 80,
    height: 120,
  },
  profileIcon: {
    width: 40,
    height: 40,
  },
  menuContainer: {
    position: 'absolute',
    top: 40,
    right: 10,
    left: 0,
    width: '130%',
    backgroundColor: COLORS.white,
    borderRadius: 5,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: 'auto',
    zIndex: 1000,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    minWidth: 200,
  },
  menuIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
    color: Colors.primary,
  },
})

export default ProfileMenu
