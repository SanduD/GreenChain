import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../components/styles'
import Card from '../components/Card'
import { COLORS, icons, SIZES } from '../constants'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useAuthContext } from '../hooks/useAuthContext'

function calculateCO2Saved(bottles, kwhReduced, ticketsUsed) {
  const CO2_PER_BOTTLE = (82.8 * 4) / 1000
  const CO2_PER_KWH = 226 / 1000
  const CO2_PER_TICKET = 800 / 1000

  const co2SavedFromBottles = bottles * CO2_PER_BOTTLE
  const co2SavedFromKwh = kwhReduced * CO2_PER_KWH
  const co2SavedFromTickets = ticketsUsed * CO2_PER_TICKET

  const totalCO2Saved =
    co2SavedFromBottles + co2SavedFromKwh + co2SavedFromTickets

  return totalCO2Saved
}

function Middle({ percent }) {
  const { userInfo, bottles, kwhReduced, ticketsUsed } = useAuthContext()

  const totalCO2Saved = calculateCO2Saved(bottles, kwhReduced, ticketsUsed)

  const totalCO2SavedText = `${totalCO2Saved.toFixed(1)} kg`
  return (
    <View style={styles.main}>
      <View style={styles.imageContainer}>
        <Image
          source={
            userInfo && userInfo.user.photo
              ? { uri: userInfo.user.photo }
              : require('../assets/icons/user.png')
          }
          style={styles.image}
        />
        <Text
          style={{ fontSize: 16, color: Colors.primary, fontWeight: 'bold' }}
        >
          {userInfo && userInfo.user.name}
        </Text>
        <Text
          style={{ fontSize: 16, color: Colors.primary, fontWeight: '500' }}
        >
          {userInfo && userInfo.user.email}{' '}
        </Text>
      </View>

      <View style={styles.profileContainer}>
        <Card
          icon={
            <Image
              source={icons.carbon}
              style={{
                width: 100,
                height: 100,
                marginLeft: 20,
                marginBottom: 5,
              }}
            />
          }
          cardTextTwo={`${totalCO2SavedText}
  saved CO2`}
          style={{ backgroundColor: COLORS.lightGreen, width: 200 }}
        />
        <Card
          icon={
            <Image
              source={require('../assets/icons/top-rated.png')}
              style={{
                width: 80,
                height: 80,
              }}
            />
          }
          cardTextTwo={`Top ${percent}% of all users`}
          style={{ backgroundColor: COLORS.lightGreen, marginLeft: 10 }}
        />
      </View>
    </View>
  )
}

function Bottom() {
  const { bottles, kwhReduced, ticketsUsed } = useAuthContext()

  const bottlesString = bottles.toString() + ' ♻️'
  const kwhReducedString = kwhReduced.toString() + ' ⚡'
  const ticketsUsedString = ticketsUsed.toString() + ' 🎫'
  return (
    <View style={styles.bottomContainer}>
      <Text
        style={{
          fontSize: 20,
          color: Colors.primary,
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Your Progress 👏
      </Text>

      <View style={styles.completeContainer}>
        <Card
          icon={
            <Image source={icons.bottle} style={{ width: 40, height: 40 }} />
          }
          cardTextOne={bottlesString}
          cardText="Recycled"
          style={{ backgroundColor: COLORS.green, marginLeft: -10 }}
        />
        <Card
          icon={
            <Image source={icons.energy} style={{ width: 40, height: 40 }} />
          }
          cardTextOne={kwhReducedString}
          cardText="Khw Reduced"
          style={{ backgroundColor: COLORS.green, marginLeft: 10 }}
        />
        <Card
          icon={
            <Image source={icons.ticket} style={{ width: 40, height: 40 }} />
          }
          cardTextOne={ticketsUsedString}
          cardText="Tickets used"
          style={{ backgroundColor: COLORS.green, marginLeft: 10 }}
        />
      </View>
    </View>
  )
}

const ProfileScreen = ({ navigation }) => {
  const [percent, setPercent] = useState(10)

  const openDrawer = () => {
    navigation.openDrawer()
  }
  return (
    <View
      style={{
        backgroundColor: COLORS.lightGreen,
        height: '100%',
        padding: SIZES.padding * 3,
      }}
    >
      <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
        <Icon name="bars" size={24} color={Colors.primary} />
      </TouchableOpacity>
      <Middle percent={10} />
      <Bottom />
      <Text
        style={{
          fontSize: 20,
          color: Colors.primary,
          textAlign: 'center',
          marginTop: 20,
        }}
      >
        Keep it up! 🌟
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    marginTop: 10,
  },
  menuButton: {
    marginRight: 0,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 50,
    marginBottom: 5,
  },
  middleSectionTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    padding: 20,
  },
  middleSectionText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  toptext: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  bottomtext: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '700',
  },

  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: '-15%',
    paddingTop: 10,
  },

  //bottom
  bottomContainer: {
    marginTop: 20,
  },
  completeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginRight: 10,
  },
  card: {
    backgroundColor: Colors.primary,
  },
  bottomSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  bottomSectionText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.primary,
    borderBottomWidth: 1,
    marginBottom: 5,
    borderBottomColor: Colors.secondary,
  },
})

export default ProfileScreen
