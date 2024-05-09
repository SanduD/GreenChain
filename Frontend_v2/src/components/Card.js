import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from './styles'
import { COLORS } from '../constants'
export default function Card({
  icon,
  cardTextOne,
  cardTextTwo,
  cardText,
  style,
}) {
  return (
    <View style={[styles.cardContainer, style]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}

      {cardText && <Text style={styles.cardText}>{cardText}</Text>}

      {cardTextOne && <Text style={styles.cardTextOne}>{cardTextOne}</Text>}

      {cardTextTwo && <Text style={styles.cardTextTwo}>{cardTextTwo}</Text>}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      ></View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.tertiary,
    width: 110,
    height: 150,
    borderRadius: 20,
    alignItems: 'center',
  },
  iconContainer: {
    // backgroundColor: COLORS.green,
    width: 45,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  cardText: {
    color: Colors.primary,
    fontWeight: '400',
    fontSize: 14,
    marginVertical: 15,
    textAlign: 'center',
  },
  cardTextOne: {
    fontWeight: 'bold',
    color: Colors.white,
    fontSize: 18,
  },
  cardTextTwo: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 3,
    textAlign: 'center',
    marginVertical: 15,
  },
})
