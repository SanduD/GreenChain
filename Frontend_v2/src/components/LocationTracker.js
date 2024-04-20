import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  PermissionsAndroid,
} from 'react-native'
import Geolocation from 'react-native-geolocation-service'

export default function LocationTracker() {
  const [location, setLocation] = useState(null)
  const [hasLocationPermission, setHasLocationPermission] = useState(false)

  useEffect(() => {
    requestLocationPermission()
    getLocation()
  }, [])

  const requestLocationPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'GreenChain needs access to your location.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      setHasLocationPermission(true)
    } else {
      setHasLocationPermission(false)
    }
  }

  const getLocation = () => {
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          setLocation(position)
        },
        error => {
          console.log(error.code, error.message)
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      )
    }
  }

  return (
    <View style={styles.container}>
      {/* <Text>Current Location:</Text>
      {location && (
        <Text>
          Latitude: {location.coords.latitude}, Longitude:{' '}
          {location.coords.longitude}
        </Text>
      )}
      <Button title="Get Location" onPress={getLocation} /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
})
