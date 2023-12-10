import React from 'react';
import { View, Text, Image, TouchableOpacity, Vibration, Button } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { COLORS, FONTS, SIZES, icons } from '../constants';
import { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StyleSheet } from 'react-native';
import axios from 'axios';

const Scan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned');

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  };

  const fetchProductData = async barcode => {
    const apiKey = '';
    const url = `https://api.barcodelookup.com/v3/products?barcode=${barcode}&formatted=y&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const data = response.data;
      setText(data.products[0].title);
      // console.log(data.products[0].title);
    } catch (error) {
      console.error('Eroare la solicitarea API:', error);
    }
  };

  //requesting for camera permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  //what happens when you scan the barcode
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    //setText(data);
    fetchProductData(data);
  };

  if (hasPermission === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.transparent }}>
        <Text style={{ ...FONTS.h3 }}>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.transparent }}>
        <Text style={{ ...FONTS.h3 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>
    );
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

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: COLORS.green, ...FONTS.body3 }}>Scan for Payment</Text>
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
          onPress={() => console.log('Info')}
        >
          <Image
            source={icons.info}
            style={{
              height: 25,
              width: 25,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderOtherMethods() {
    return (
      <View
        style={{
          position: 'absolute',
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
          <Button
            title={'Tap to Scan Again'}
            onPress={() => {
              setScanned(false);
              setText('Not scanned yet');
            }}
            color="tomato"
          />
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
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: SIZES.padding * 2,
            }}
            onPress={() => console.log('Barcode')}
          >
            <View
              style={{
                width: 40,
                height: 40,
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
                  height: 25,
                  width: 25,
                  tintColor: COLORS.primary,
                }}
              />
            </View>
            <Text style={{ marginLeft: SIZES.padding, ...FONTS.body4 }}>Introduceti manual codul de bare</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.transparent }}>
      <View style={{ position: 'absolute', backgroundColor: COLORS.transparent }}>{renderHeader()}</View>

      {hasPermission == false && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.transparent }}>
          <Text style={{ ...FONTS.h3 }}>No access to camera</Text>
          <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
        </View>
      )}

      {hasPermission === null && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.transparent }}>
          <Text style={{ ...FONTS.h3 }}>Requesting for camera permission</Text>
        </View>
      )}
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.scannerFrame} />
      </View>

      {renderOtherMethods()}
    </View>
  );
};

const styles = StyleSheet.create({
  barcodebox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%',
    marginBottom: '20%',
    margin: 10,
  },
  scannerFrame: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 20,
    alignSelf: 'center',
  },
  scannerFrame: {
    height: 100,
    width: 300,
    borderWidth: 2,
    borderColor: '#fff', // Alege o culoare vizibilă
    borderRadius: 20,
  },

  maintext: {
    fontSize: 16,
    color: 'red',
  },
});

export default Scan;
