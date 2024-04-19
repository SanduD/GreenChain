import React from 'react'
import {
  SafeAreaView,
  View,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { COLORS, SIZES, images } from '../constants'
import Header from '../components/Header'
import Features from '../components/Features'
import Schedule from '../components/Schedule'
import VideoComponent from '../components/videoComponent'

const Home = ({ navigation }) => {
  function renderBanner() {
    return (
      <View style={styles.bannerContainer}>
        <Image
          source={require('../assets/images/banner.jpg')}
          resizeMode="cover"
          style={styles.banner}
        />
      </View>
    )
  }

  function HeaderComponent() {
    return (
      <View>
        <Header navigation={navigation} />
        <Schedule />
        <VideoComponent
          source={require('../assets/video/animatedHomeScreen.mp4')}
          videoStyle={styles.homeVideo}
        />
        <Features navigation={navigation} />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        ListHeaderComponent={HeaderComponent}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightGreen,
  },
  contentContainer: {
    paddingHorizontal: SIZES.padding * 3,
  },
  bannerContainer: {
    height: 300,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: '-15%',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  homeVideo: {
    width: 300,
    height: 300,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: SIZES.padding * 2,
  },
})
export default Home
