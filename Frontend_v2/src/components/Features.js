import React from 'react'
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import { COLORS, SIZES, FONTS, icons } from '../constants'
import { Colors, SubTitle } from './styles'
import Ionicons from 'react-native-vector-icons/Ionicons'

const featuresData = [
  {
    id: 1,
    icon: icons.ticket_colored,
    backgroundColor: Colors.tertiary,
    description: 'Tickets',
  },
  {
    id: 2,
    icon: icons.bill,
    color: COLORS.emerald,
    backgroundColor: Colors.tertiary,
    description: 'Bills',
  },
  {
    id: 3,
    icon: icons.reload,
    color: COLORS.red,
    backgroundColor: Colors.tertiary,
    description: 'History',
  },
  {
    id: 4,
    icon: icons.wallet,
    color: Colors.quaternary,
    backgroundColor: Colors.tertiary,
    description: 'Wallet',
  },
]

const Features = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        marginBottom: SIZES.padding * 2,
        width: 60,
        alignItems: 'center',
      }}
      onPress={() => {
        if (item.description === 'Wallet') {
          navigation.navigate('Wallet')
        } else if (item.description === 'History') {
          navigation.navigate('History')
        } else if (item.description === 'Tickets') {
          navigation.navigate('TicketScreen')
        } else if (item.description === 'Bills') {
          navigation.navigate('BillScreen')
        } else {
          console.log(item.description)
        }
      }}
    >
      <View
        style={{
          height: 60,
          width: 60,
          marginBottom: 5,
          borderRadius: 20,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          source={item.icon}
          resizeMode="contain"
          style={{
            height: 25,
            width: 25,
            tintColor: item.color,
          }}
        />
      </View>
      <Text
        style={{
          textAlign: 'center',
          flexWrap: 'wrap',
          ...FONTS.body4,
          color: Colors.primary,
        }}
      >
        {item.description}
      </Text>
    </TouchableOpacity>
  )

  return (
    <FlatList
      ListHeaderComponent={<SubTitle>Quick Actions</SubTitle>}
      data={featuresData}
      numColumns={4}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      keyExtractor={item => `${item.id}`}
      renderItem={renderItem}
      style={{ marginTop: SIZES.padding * 2 }}
    />
  )
}

export default Features
