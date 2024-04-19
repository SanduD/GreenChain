import React from 'react'
import { View, StyleSheet } from 'react-native'
import Video from 'react-native-video'

const VideoComponent = ({ source, videoStyle }) => {
  return (
    <View style={styles.container}>
      <Video
        source={source}
        style={[styles.video, videoStyle]}
        controls={false}
        resizeMode="contain"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: 250,
    height: 250,
    borderRadius: 20,
    overflow: 'hidden',
  },
})

export default VideoComponent
