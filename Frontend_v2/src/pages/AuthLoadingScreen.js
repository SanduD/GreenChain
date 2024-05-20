import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useAuthContext } from '../hooks/useAuthContext'
import VideoComponent from '../components/videoComponent'
import { View, StyleSheet } from 'react-native'

const AuthLoadingScreen = () => {
  const { userInfo, authChecked } = useAuthContext()
  const navigation = useNavigation()

  useEffect(() => {
    if (authChecked) {
      setTimeout(() => {
        if (userInfo && userInfo.user.walletAddress) {
          navigation.navigate('Drawer')
        } else {
          navigation.navigate('Login')
        }
      }, 1200)
    }
  }, [authChecked, userInfo, navigation])

  return (
    <View style={styles.fullScreen}>
      <VideoComponent source={require('../assets/video/loadingVideo.mp4')} />
    </View>
  )
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#162918',
  },
})

export default AuthLoadingScreen
