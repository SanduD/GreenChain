import React from 'react'
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
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

const CustomDrawer = props => {
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
          <Image
            source={require('../assets/icons/hacker.png')}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              color: Colors.primary,
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}
          >
            Sandu Dragos
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                color: Colors.primary,
                fontFamily: 'Roboto-Regular',
                marginRight: 5,
              }}
            >
              280 GRC
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
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
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

export default CustomDrawer
