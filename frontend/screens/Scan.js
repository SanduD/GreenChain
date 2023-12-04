import React from 'react';
import { View, Text, Image, TouchableOpacity, Vibration } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { COLORS, FONTS, SIZES, icons } from '../constants';
import { useState, useEffect } from 'react';

const Scan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  function renderHeader() {
    return (
      <View
        style={{
          width: SIZES.width,
          flexDirection: 'row',
          marginTop: SIZES.padding * 4,
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
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: COLORS.white, ...FONTS.body3 }}>Scan for Payment</Text>
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
          height: 220,
          padding: SIZES.padding * 3,
          borderTopLeftRadius: SIZES.radius,
          borderTopRightRadius: SIZES.radius,
          backgroundColor: COLORS.white,
        }}
      >
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

  function onBarCodeRead(result) {
    console.log(result.data);
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.transparent }}>
      <Camera
        ref={ref => {
          this.camera = ref;
        }}
        style={{ width: '100%', height: '100%' }}
        type={Camera.Constants.Type.back}
        flashMode={Camera.Constants.FlashMode.off}
        scanBarcode
        frameColor="white"
        laserColor="red"
        showFrame={true}
        onBarCodeScanned={onBarCodeRead}
        onReadCode={event => {
          Vibration.vibrate(100);
          // setBarcode(event.nativeEvent.codeStringValue);
          console.log('barcode', event.nativeEvent.codeStringValue);
        }}
      />
      <View style={{ position: 'absolute', backgroundColor: COLORS.transparent }}>
        {renderHeader()}
        {/* {renderScanFocus()} */}
      </View>

      {renderOtherMethods()}
    </View>
  );
};

export default Scan;
