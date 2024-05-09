import React, { useRef, useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  PermissionsAndroid,
} from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../constants'
import { icons } from '../constants'
import { Colors, PageTitle } from '../components/styles'
import Geolocation from 'react-native-geolocation-service'
import useLocation from '../hooks/useLocation'

const INITIAL_REGION = {
  latitude: 44.41047668457031,
  longitude: 26.082460403442383,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

export default function Location() {
  const mapRef = useRef(null)

  const { currentLocation, getDistance, markers } = useLocation()

  const onMarkerSelected = marker => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: marker.latitude,
          longitude: marker.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        500
      )
    }
  }
  const sortedMarkers = markers
    .map(marker => ({
      ...marker,
      distance: currentLocation
        ? getDistance(
            currentLocation.latitude,
            currentLocation.longitude,
            marker.latitude,
            marker.longitude
          )
        : null,
    }))
    .sort((a, b) => a.distance - b.distance)

  return (
    <View style={styles.container}>
      <PageTitle>Collection locations</PageTitle>
      <MapView
        style={styles.map}
        initialRegion={INITIAL_REGION}
        showsUserLocation={true}
        showsMyLocationButton={true}
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker}
            title={marker.name}
            pinColor={COLORS.secondary}
            image={icons.recycleCenter}
            style={styles.resizedMarkerStyle}
            onPress={() => onMarkerSelected(marker)}
          />
        ))}
      </MapView>

      <FlatList
        data={sortedMarkers}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => onMarkerSelected(item)}
          >
            <Text style={styles.listItemText}>
              {item.name} -{' '}
              {item.distance
                ? item.distance.toFixed(2) + ' km'
                : 'Calculating distance...'}
            </Text>
          </TouchableOpacity>
        )}
        style={styles.list}
      />

      {/* <LocationTracker /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: COLORS.lightGreen,
  },
  map: {
    margin: 20,
    width: '90%',
    height: '50%',
  },
  button: {
    padding: 10,
    marginTop: 10,
  },
  resizedMarkerStyle: {
    width: 40,
    height: 40,
  },
  list: {
    flex: 1,
    maxWidth: '90%',
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
  },
  listItemText: {
    fontSize: 16,
    color: COLORS.primary,
  },
})
