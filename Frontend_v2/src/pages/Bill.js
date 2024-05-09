import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { COLORS } from '../constants'
import { Colors } from '../components/styles'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

const BillScreen = () => {
  const openCamera = () => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
    }
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage)
      } else {
        const source = { uri: response.assets[0].uri }
        // logică pentru a trimite imaginea la backend
        console.log(source)
      }
    })
  }

  const openGallery = () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
    }
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage)
      } else {
        const source = { uri: response.assets[0].uri }
        console.log(source)

        // logică pentru a trimite imaginea la backend
      }
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Image
          source={require('../assets/icons/bill_colored.png')}
          style={styles.billImage}
        />
        <Text style={styles.headerTextSmall}>You need to Upload your</Text>
        <Text style={styles.headerTextLarge}>Energy/Gas Bill</Text>
        <Text style={styles.descriptionText}>
          Ensure the document is clear and the details are visible.
        </Text>
      </View>

      <TouchableOpacity style={styles.buttonCamera} onPress={openCamera}>
        <Image
          source={require('../assets/icons/camera.png')}
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Use Camera</Text>
      </TouchableOpacity>

      <View style={styles.lowerContainer}>
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>
        <TouchableOpacity style={styles.buttonGallery} onPress={openGallery}>
          <Image
            source={require('../assets/icons/image.png')}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Select the bill from Gallery</Text>
          <Text style={styles.buttonSecondaryText}>PNG or JPEG</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: Colors.primary,
    padding: 20,
  },
  billImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  lowerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.lightGreen,
    padding: 20,
  },
  headerTextSmall: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerTextLarge: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonCamera: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 25,
    width: '50%',
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 10,
  },
  buttonGallery: {
    backgroundColor: COLORS.white,
    padding: 30,
    borderRadius: 30,
    width: '90%',
  },
  buttonText: {
    color: Colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: -20,
    fontSize: 16,
  },
  buttonSecondaryText: {
    color: Colors.primary,
    textAlign: 'center',
  },

  icon: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
  orText: {
    fontSize: 18,
    color: '#000',
    marginVertical: 10,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 80,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 30,
  },
})
export default BillScreen
