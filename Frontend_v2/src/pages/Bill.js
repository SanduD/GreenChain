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
import { Picker } from '@react-native-picker/picker'
import { COLORS } from '../constants'
import { Colors } from '../components/styles'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { addActiveDay } from '../hooks/utils'
import { useAuthContext } from '../hooks/useAuthContext'
import axios from 'axios'
import { BASE_URL, AVERAGE_KWH } from '../constants/config'

const BillScreen = () => {
  const { userInfo, dispatch } = useAuthContext()

  const [selectedBillType, setSelectedBillType] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)

  const sendData = async () => {
    if (!selectedImage) {
      Alert.alert('No image selected', 'Please select an image before sending.')
      return
    }

    console.log('selectedBillType:', selectedBillType)
    if (!selectedBillType) {
      Alert.alert(
        'No bill type selected',
        'Please select a bill type before sending.'
      )
      return
    }

    const formData = new FormData()
    formData.append('userId', userInfo?.user._id)
    formData.append('type', selectedBillType)
    formData.append('image', {
      uri: selectedImage.uri,
      type: selectedImage.type,
      name: selectedImage.fileName,
    })

    try {
      const response = await axios.post(`${BASE_URL}/api/bills`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      await addActiveDay(userInfo.user._id, dispatch)

      const khw_reduced =
        AVERAGE_KWH - parseInt(response.data.savedBill.quantity)
      if (khw_reduced > 0) {
        dispatch({ type: 'UPDATE_KWH_REDUCED', payload: khw_reduced })
      }

      dispatch({
        type: 'UPDATE_BALANCE_GRC',
        payload: response.data.savedBill.rewardGRC,
      })

      Alert.alert(
        'Success',
        `Bill is ok! You just received ${response.data.savedBill.rewardGRC} GRC!`
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
          {selectedImage ? (
            <Text style={styles.buttonText}>Bill selected</Text>
          ) : (
            <View>
              <Text style={styles.buttonText}>
                Select the bill from Gallery
              </Text>
              <Text style={styles.buttonSecondaryText}>PNG or JPEG</Text>
            </View>
          )}
        </TouchableOpacity>

        <Picker
          selectedValue={selectedBillType}
          style={styles.picker}
          onValueChange={itemValue => {
            setSelectedBillType(itemValue)
            console.log('selectedBillType:', itemValue)
          }}
        >
          <Picker.Item label="Select Bill Type" value="" />
          <Picker.Item label="Gas - Engie" value="Engie_gas" />
          <Picker.Item label="Gas - EON" value="EON_gas" />
          {/* <Picker.Item label="Energy - EON" value="EON_energy" /> */}
          <Picker.Item
            label="Energy - Hidroelectrica"
            value="Hidroelectrica_energy"
          />
          <Picker.Item label="Energy - Enel" value="Enel_energy" />
        </Picker>

        <TouchableOpacity style={styles.sendButton} onPress={sendData}>
          <Text style={styles.sendButtonText}>Check Bill</Text>
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
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 30,
  },
  picker: {
    width: '90%',
    backgroundColor: COLORS.white,
    marginVertical: 20,
    color: 'black',
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
export default BillScreen
