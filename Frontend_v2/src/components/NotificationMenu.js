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
    width: 50,
    top: 0,
    zIndex: 10,
  },
  profileIcon: {
    width: 30,
    height: 30,
  },
  menuContainer: {
    position: 'absolute',
    top: 35,
    right: 0,
    left: -140,
    width: 220,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: 'center',
    width: '100%',
  },
  menuIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  menuText: {
    fontSize: 12,
    flexWrap: 'wrap',
    flex: 1,
  },
})
export default NotificationMenu
