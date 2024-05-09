import React from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import Share from 'react-native-share'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../constants'
import RNFetchBlob from 'rn-fetch-blob'

const downloadImageAndShare = async () => {
  const image = Image.resolveAssetSource(require('../assets/images/banner.jpg'))
  const { dirs } = RNFetchBlob.fs
  const targetPath = `${dirs.CacheDir}/banner.jpg`

  try {
    await RNFetchBlob.config({
      fileCache: true,
      appendExt: 'jpg',
      path: targetPath,
    }).fetch('GET', image.uri)

    const shareOptions = {
      title: 'Share via',
      message:
        'Check out GreenChain, a great app to help you manage and reduce your carbon footprint!',
      url: `file://${targetPath}`,
      type: 'image/jpeg',
    }

    await Share.open(shareOptions)
  } catch (error) {
    // console.error('Error downloading or sharing', error)
  }
}
const ShareButton = () => {
  return (
    <TouchableOpacity
      onPress={downloadImageAndShare}
      style={{ paddingVertical: 15 }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons
          name="share-social-outline"
          size={22}
          color={COLORS.secondary}
        />
        <Text style={{ fontSize: 15, marginLeft: 5, color: COLORS.secondary }}>
          Tell a Friend
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default ShareButton
