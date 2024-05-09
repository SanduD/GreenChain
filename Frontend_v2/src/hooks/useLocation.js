import { useState, useEffect } from 'react'
import Geolocation from 'react-native-geolocation-service'
import { PermissionsAndroid } from 'react-native'

const useLocation = () => {
  const [currentLocation, setCurrentLocation] = useState(null)

  useEffect(() => {
    const checkInitialPermissions = async () => {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
      console.log('granted', granted)
      if (granted) {
        getLocation()
      } else {
        requestLocationPermission()
      }
    }
    console.log('checkInitialPermissions')

    checkInitialPermissions()
  }, [])

  const requestLocationPermission = async () => {
    console.log('requestLocationPermission')
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

    const hasPermission = granted === PermissionsAndroid.RESULTS.GRANTED
    if (hasPermission) {
      getLocation()
    }
  }

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        setCurrentLocation({ latitude, longitude })
      },
      error => {
        console.log(error.code, error.message)
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
    )
  }

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371
    const dLat = deg2rad(lat2 - lat1)
    const dLon = deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const deg2rad = deg => {
    return deg * (Math.PI / 180)
  }

  const markers = [
    {
      latitude: 44.40970993041992,
      longitude: 26.080162048339844,
      name: 'Collection point 1',
    },
    {
      latitude: 44.40710414176723,
      longitude: 26.077537456393884,
      name: 'Collection point 2',
    },
    {
      latitude: 44.41822507632575,
      longitude: 26.073073069370135,
      name: 'Collection point 3',
    },
    {
      latitude: 44.420516947679054,
      longitude: 26.075248088686465,
      name: 'Collection point 4',
    },
    {
      latitude: 44.39967049385718,
      longitude: 26.071214046680627,
      name: 'Collection point 5',
    },
    {
      latitude: 44.392311147944284,
      longitude: 26.080912913630836,
      name: 'Collection point 6',
    },
    {
      latitude: 44.402491331089244,
      longitude: 26.0563653377167,
      name: 'Collection point 7',
    },
    {
      latitude: 44.42554350980861,
      longitude: 26.064433421540834,
      name: 'Collection point 8',
    },
    {
      latitude: 44.43559533743456,
      longitude: 26.043319073683353,
      name: 'Collection point 9',
    },
    {
      latitude: 44.418801743719435,
      longitude: 26.139779196362234,
      name: 'Collection point 10',
    },
    {
      latitude: 44.410306236244324,
      longitude: 26.149604308015565,
      name: 'Collection point 11',
    },
    {
      latitude: 44.39183348393547,
      longitude: 26.123490195463283,
      name: 'Collection point 12',
    },
    {
      latitude: 44.384442749897694,
      longitude: 26.15451686384223,
      name: 'Collection point 13',
    },
    {
      latitude: 44.38924683317412,
      longitude: 26.093239193793814,
      name: 'Collection point 14',
    },
  ]

  return { currentLocation, getDistance, markers }
}

export default useLocation
