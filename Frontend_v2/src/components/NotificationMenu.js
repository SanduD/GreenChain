import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native'
import { icons, COLORS } from '../constants'
import { StyledInputLabel } from './styles'

const menuItems = [
  {
    id: 'notif1',
    title: 'Felicitari! O noua recompensa a fost deblocata',
    icon: require('../assets/icons/bell.png'),
  },
  {
    id: 'notif2',
    title: 'Felicitari! O noua recompensa a fost deblocata',
    icon: require('../assets/icons/bell.png'),
  },
  {
    id: 'notif3',
    title: 'Felicitari! O noua recompensa a fost deblocata',
    icon: require('../assets/icons/bell.png'),
  },
  {
    id: 'notif4',
    title: 'Felicitari! O noua recompensa a fost deblocata',
    icon: require('../assets/icons/bell.png'),
  },
]

const NotificationMenu = ({ isVisible, toggleMenu }) => {
  const handleMenuItemPress = item => {
    console.log(`${item.title} pressed`)
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu}>
        <Image source={icons.bell} style={styles.profileIcon} />
        <View
          style={{
            position: 'absolute',
            top: -5,
            right: -5,
            height: 10,
            width: 10,
            backgroundColor: COLORS.red,
            borderRadius: 5,
          }}
        ></View>
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
                <StyledInputLabel style={styles.menuText}>
                  {item.title}
                </StyledInputLabel>
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
    top: 5,
  },
  profileIcon: {
    width: 30,
    height: 30,
  },
  menuContainer: {
    position: 'absolute',
    top: 40,
    right: 10,
    left: 0,
    width: '230%',
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
  },
})

export default NotificationMenu
