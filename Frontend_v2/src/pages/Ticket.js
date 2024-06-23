import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Alert,
} from 'react-native'
import { COLORS } from '../constants'
import { Colors } from '../components/styles'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import axios from 'axios'
import { BASE_URL } from '../constants/config'
import { useAuthContext } from '../hooks/useAuthContext'

import { addActiveDay } from '../hooks/utils'

const TicketScreen = () => {
  const { userInfo, dispatch } = useAuthContext()
  const [selectedImage, setSelectedImage] = useState(null)

  const sendData = async () => {
    if (!selectedImage) {
      Alert.alert('No image selected', 'Please select an image before sending.')
      return
    }

    const formData = new FormData()
    formData.append('userId', userInfo?.user._id)
    formData.append('image', {
      uri: selectedImage.uri,
      type: selectedImage.type,
      name: selectedImage.fileName,
    })

    try {
      const response = await axios.post(`${BASE_URL}/api/tickets`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log('Ticket sent:', response.data.savedTicket.rewardGRC)
      await addActiveDay(userInfo.user._id, dispatch)
      dispatch({ type: 'UPDATE_TICKETS_USED', payload: 1 })
      dispatch({
        type: 'UPDATE_BALANCE_GRC',
        payload: response.data.savedTicket.rewardGRC,
      })

      Alert.alert(
        'Success',
        `Ticket is ok! You just received ${response.data.savedTicket.rewardGRC} GRC!`
      )
    } catch (error) {
      if (error.response) {
        Alert.alert(
          'Error',
          `An error occurred: ${error.response.data.message}`
        )
      } else if (error.request) {
        Alert.alert('Error', 'No response received from the server.')
      } else {
        Alert.alert('Error', `An error occurred: ${error.message}`)
      }
    }
  }

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'GreenChain needs access to your camera to take photos.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      )
      return granted === PermissionsAndroid.RESULTS.GRANTED
    } catch (err) {
      return false
    }
  }

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission()
    if (!hasPermission) {
      Alert.alert(
        'Camera Permission',
        'Camera permission is required to take photos.'
      )
      return
    }

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
        const source = response.assets[0]
        setSelectedImage(source)
        // console.log(source)
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
        const source = response.assets[0]
        setSelectedImage(source)
        // console.log(source)
      }
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Image
          source={require('../assets/icons/ticket_colored.png')}
          style={styles.billImage}
        />
        <Text style={styles.headerTextSmall}>You need to Upload your</Text>
        <Text style={styles.headerTextLarge}>Bus Ticket</Text>
        <Text style={styles.descriptionText}>
          Ensure the ticket is clear and the details are visible.
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
            style={styles.iconGalery}
          />
          {selectedImage ? (
            <Text style={styles.buttonText}>Ticket selected</Text>
          ) : (
            <View>
              <Text style={styles.buttonText}>
                Select the ticket from Gallery
              </Text>
              <Text style={styles.buttonSecondaryText}>PNG or JPEG</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} onPress={sendData}>
          <Text style={styles.sendButtonText}>Check ticket</Text>
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
    marginBottom: 20,
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
  iconGalery: {
    width: 20,
    height: 20,
    marginLeft: -10,
  },
  orText: {
    fontSize: 18,
    color: '#000',
    marginVertical: 10,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 30,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 25,
    width: '50%',
    alignSelf: 'center',
  },
  sendButtonText: {
    color: Colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
})
export default TicketScreen
