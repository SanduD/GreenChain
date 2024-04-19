import React, { useState } from 'react'
import { View } from 'react-native'
import { useAuthContext } from '../hooks/useAuthContext'
import { SubTitle } from './styles'
import NotificationMenu from './NotificationMenu'
import { SIZES } from '../constants'

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

  return (
    <View style={{ flexDirection: 'row', marginVertical: SIZES.padding * 2 }}>
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

export default Header
