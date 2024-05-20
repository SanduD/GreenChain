import React from 'react'
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'

import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Colors } from './styles'
import { COLORS } from '../constants'
import ShareButton from './shareButton'
import { useLogout } from '../hooks/useLogout'
import { useNavigation } from '@react-navigation/native'
import { useAuthContext } from '../hooks/useAuthContext'

const CustomDrawer = props => {
  const { userInfo, balanceGRC } = useAuthContext()

  const navigation = useNavigation()
  const { logout } = useLogout()

  const handleLogout = async item => {
    await logout()
    navigation.navigate('Login')
  }

  const UserProfileImage = () => {
    return (
      <Image
        source={
          userInfo && userInfo.user.photo
            ? { uri: userInfo.user.photo }
            : require('../assets/icons/hacker.png')
        }
        style={styles.profileImage}
      />
    )
  }
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          marginTop: -5,
        }}
      >
        <ImageBackground
          source={require('../assets/images/menu_back.jpg')}
          style={{ padding: 20 }}
        >
          <UserProfileImage />
          <Text
            style={{
              color: Colors.primary,
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}
          >
            {userInfo?.user?.name ?? 'User'}{' '}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                color: Colors.primary,
                fontFamily: 'Roboto-Regular',
                marginRight: 5,
              }}
            >
              {userInfo ? balanceGRC : 'CANT CONNECT'}{' '}
            </Text>
            <FontAwesome5 name="coins" size={14} color={Colors.primary} />
          </View>
        </ImageBackground>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.lightGreen,
            paddingTop: 10,
            height: 1000,
          }}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: Colors.primary,
          backgroundColor: COLORS.lightGreen,
        }}
      >
        <ShareButton />
        <TouchableOpacity
          onPress={handleLogout}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="exit-outline" size={22} color={COLORS.secondary} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
                color: COLORS.secondary,
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
})
export default CustomDrawer
