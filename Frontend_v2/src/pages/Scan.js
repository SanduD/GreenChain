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

// const Scan = ({ navigation }) => {};

const Scan = ({ navigation }) => {
  // const [hasPermission, setHasPermission] = useState(null);
  const [barcodeValue, setBarcodeValue] = useState('')
  const [scanned, setScanned] = useState(false)
  const [text, setText] = useState('Not yet scanned')
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

  const showInfoAlert = () => {
    Alert.alert(
      'Ajutor Scanare',
      'Folosește camera pentru a scana rapid codul de bare al PET-ului sau introdu manual codul dacă eticheta este deteriorată. Asigură-te că PET-ul este bine iluminat și că întregul cod de bare este vizibil în cadru pentru a facilita scanarea corectă.',
      [
        {
          text: 'Am înțeles',
          onPress: () => console.log('Butonul Am înțeles a fost apăsat'),
        },
      ]
    )
  }

  const handlePressInfo = () => {
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  const InfoModal = ({ isVisible, onClose }) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlayModal}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Folosește camera pentru a scana rapid codul de bare al PET-ului
              sau introdu manual codul dacă eticheta este deteriorată.
              Asigură-te că PET-ul este bine iluminat și că întregul cod de bare
              este vizibil în cadru pentru a facilita scanarea corectă.
            </Text>
            <TouchableOpacity style={styles.openButton} onPress={onClose}>
              <Text style={styles.textStyle}>Am înțeles</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  )

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
        <TouchableOpacity
          style={{
            width: 45,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('Home')}
        >
          <Image
            source={icons.close}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.green,
            }}
          />
        </TouchableOpacity>

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
          <InfoModal isVisible={modalVisible} onClose={handleCloseModal} />

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

        <Text style={{ ...FONTS.h4 }}>Alte metode de scanat</Text>

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
              <Text style={{ ...FONTS.h3, marginBottom: 10 }}>
                No access to camera
              </Text>
              <StyledButton
                title={'Allow Camera'}
                onPress={requestCameraPermission}
              />
              <View style={{ height: 230, justifyContent: 'flex-end' }}>
                {renderOtherMethods()}
              </View>
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
              <Text
                style={{ ...FONTS.h3, marginBottom: 10, color: Colors.primary }}
              >
                Requesting for camera permission
              </Text>
              <StyledButton onPress={requestCameraPermission}>
                <ButtonText>Allow Camera</ButtonText>
              </StyledButton>
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
  cameraView: {
    width: '90%',
    top: 30,
    height: '50%',
    borderRadius: SIZES.radius,
    overflow: 'hidden',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.transparent,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  frame: {
    width: 250,
    top: 30,
    height: 250,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
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
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: Colors.primary,
  },
})

export default Scan
