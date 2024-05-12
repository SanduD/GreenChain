import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  Modal,
} from 'react-native'

import {
  StyledInputLabel,
  Colors,
  StyledButton,
  ButtonText,
} from '../components/styles'
import { COLORS, FONTS, SIZES, icons } from '../constants'
import { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import axios from 'axios'
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
  useCameraPermission,
} from 'react-native-vision-camera'
import InfoModal from '../components/InfoModal'

// const Scan = ({ navigation }) => {};

const Scan = ({ navigation }) => {
  // const [hasPermission, setHasPermission] = useState(null);
  const [barcodeValue, setBarcodeValue] = useState('')
  const [scanned, setScanned] = useState(false)
  const [text, setText] = useState('Not yet scanned')
  const [validated, setValidated] = useState(0)
  const [lastScannedCode, setLastScannedCode] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  const [hasPermission, setHasPermission] = useState(null)
  const { requestPermission } = useCameraPermission()
  const device = useCameraDevice('back')

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes.length} codes!`, codes)
      setScanned(true)
      setText(codes[0].value)
    },
  })

  const renderCamera = () => {
    console.log('render camera')
    if (device == null) return null

    return (
      <>
        <View style={styles.cameraContainer}>
          <Camera
            style={styles.cameraView}
            codeScanner={codeScanner}
            device={device}
            isActive={true}
            onError={error => console.log('Camera error', error)}
          />
          <View style={styles.overlay}>
            <View style={styles.frame} />
          </View>
        </View>
      </>
    )
  }

  const requestCameraPermission = async () => {
    const permissionGranted = await requestPermission()
    setHasPermission(permissionGranted)
  }

  const fetchProductData = async barcode => {
    console.log('fetch data')
    // const apiKey = 'mm8sqkm40527w26oiw0804odjzsf57';
    // const url = `https://api.barcodelookup.com/v3/products?barcode=${barcode}&formatted=y&key=${apiKey}`;

    // try {
    //   const response = await axios.get(url);
    //   const data = response.data;
    //   setText(data.products[0].title);
    //   // console.log(data.products[0].title);
    // } catch (error) {
    //   console.error('Eroare la solicitarea API:', error);
    // }
  }

  // useEffect(() => {
  //   (async () => {
  //     const permissionGranted = await requestPermission();
  //     setHasPermission(permissionGranted);
  //   })();
  // }, [requestPermission]);

  //what happens when you scan the barcode
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    //setText(data);
    fetchProductData(data)
  }

  const handlePressInfo = () => {
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  function renderHeader() {
    return (
      <View
        style={{
          width: SIZES.width,
          flexDirection: 'row',
          marginTop: SIZES.padding * 2,
          paddingHorizontal: SIZES.padding * 3,
          backgroundColor: COLORS.transparent,
        }}
      >
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <StyledInputLabel>Scan the product</StyledInputLabel>
        </View>

        <TouchableOpacity
          style={{
            height: 45,
            width: 45,
            backgroundColor: COLORS.green,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={handlePressInfo}
        >
          <InfoModal
            isVisible={modalVisible}
            onClose={handleCloseModal}
            content={` Use the  📷  to quickly scan the PET's barcode or enter the code manually if the label is damaged.
  ♻️`}
          />
          <Image
            source={icons.info}
            style={{
              height: 25,
              width: 25,
              tintColor: Colors.white,
            }}
          />
        </TouchableOpacity>
      </View>
    )
  }

  function renderOtherMethods() {
    return (
      <View
        style={{
          // position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 230,
          padding: SIZES.padding * 2,
          borderTopLeftRadius: SIZES.radius,
          borderTopRightRadius: SIZES.radius,
          backgroundColor: COLORS.white,
        }}
      >
        <Text style={styles.maintext}>{text}</Text>
        {scanned && (
          <View style={styles.buttonContainer}>
            <Button
              title={'Tap to Scan Again'}
              onPress={() => {
                setScanned(false)
                setText('Not scanned yet')
              }}
              color="green"
            />
          </View>
        )}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Text style={styles.textStyle}>Other Methods</Text>
          <Text style={styles.textStyle}>Validated: {validated}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginTop: SIZES.padding * 2,
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              top: 10,
              backgroundColor: COLORS.lightGreen,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}
          >
            <Image
              source={icons.barcode}
              resizeMode="cover"
              style={{
                height: 30,
                width: 30,
                tintColor: COLORS.primary,
              }}
            />
          </View>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Introduceți codul de bare"
            value={barcodeValue}
            onChangeText={setBarcodeValue}
          />
          <TouchableOpacity
            style={styles.checkButtonStyle}
            onPress={() => console.log(barcodeValue)}
          >
            <Image
              source={icons.check}
              resizeMode="contain"
              style={{
                height: 30,
                width: 30,
                top: 15,
                tintColor: COLORS.primary,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.transparent }}>
      <View
        style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 }}
      >
        {renderHeader()}
      </View>

      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        {hasPermission === false && (
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('../assets/icons/no-camera.png')}
                style={styles.imageStyle}
              />
              <Text style={{ ...FONTS.h3, marginBottom: 10 }}>
                No access to camera
              </Text>
              <TouchableOpacity
                onPress={requestCameraPermission}
                style={[styles.styledButton]}
              >
                <Text style={styles.buttonText}>Access Camera</Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: 230, justifyContent: 'flex-end' }}>
              {renderOtherMethods()}
            </View>
          </View>
        )}

        {hasPermission === null && (
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('../assets/icons/camera.png')}
                style={styles.imageStyle}
              />
              <Text
                style={{ ...FONTS.h3, marginBottom: 10, color: Colors.primary }}
              >
                Requesting for camera permission
              </Text>
              <TouchableOpacity
                onPress={requestCameraPermission}
                style={[styles.styledButton]}
              >
                <Text style={styles.buttonText}>Access Camera</Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: 230, justifyContent: 'flex-end' }}>
              {renderOtherMethods()}
            </View>
          </View>
        )}

        {hasPermission === true && (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>{renderCamera()}</View>
            <View style={{ height: 230, justifyContent: 'flex-end' }}>
              {renderOtherMethods()}
            </View>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imageStyle: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  overlayModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  maintext: {
    fontSize: 16,
    color: COLORS.green,
  },
  cameraContainer: {
    width: '90%',
    height: '70%',
    top: 30,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20%',
    marginLeft: '5%',
  },
  cameraView: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  frame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },

  buttonContainer: {
    marginVertical: 5,
    marginHorizontal: 50,
    borderRadius: 10,
    overflow: 'hidden',
  },
  textInputStyle: {
    marginLeft: SIZES.padding,
    borderBottomWidth: 1,
    flex: 1,
    ...FONTS.body4,
  },
  checkButtonStyle: {
    marginLeft: SIZES.padding,
    justifyContent: 'center',
    alignItems: 'center',
  },

  //inforModal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: COLORS.green,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    // textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: Colors.primary,
  },

  styledButton: {
    padding: 15,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    borderRadius: 25,
    marginVertical: 5,
    height: 60,
    width: '48%',
    alignItems: 'center',
    marginRight: 5,
    marginLeft: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  textStyle: {
    fontSize: 18,
    color: COLORS.primary,
    paddingVertical: SIZES.base,
  },
})

export default Scan
