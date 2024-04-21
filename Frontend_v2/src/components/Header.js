import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useAuthContext } from '../hooks/useAuthContext'
import { Colors, SubTitle } from './styles'
import NotificationMenu from './NotificationMenu'
import { SIZES } from '../constants'
import Icon from 'react-native-vector-icons/FontAwesome'

const Header = ({ navigation }) => {
  const { userInfo } = useAuthContext()

  const welcomeMessage =
    userInfo && userInfo.user ? 'Hello, ' + userInfo.user.name + '!' : 'Hello!'

  const [isNotificationMenuVisible, setIsNotificationMenuVisible] =
    useState(false)

  const toggleNotificationMenu = () => {
    setIsNotificationMenuVisible(!isNotificationMenuVisible)
  }
  const handleOutsidePress = () => {
    if (isNotificationMenuVisible) {
      setIsNotificationMenuVisible(false)
    }
  }

  const openDrawer = () => {
    navigation.openDrawer()
  }

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
        <Icon name="bars" size={24} color={Colors.primary} />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <SubTitle>{welcomeMessage}</SubTitle>
      </View>
      <NotificationMenu
        isVisible={isNotificationMenuVisible}
        toggleMenu={toggleNotificationMenu}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    marginBottom: SIZES.padding * 2,
    alignItems: 'center',
  },
  menuButton: {
    marginRight: 20,
  },
})

export default Header
