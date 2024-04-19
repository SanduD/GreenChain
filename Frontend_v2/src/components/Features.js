import React from 'react'
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import { COLORS, SIZES, FONTS, icons } from '../constants'
import { Colors, SubTitle } from './styles'

const featuresData = [
  {
    id: 1,
    icon: icons.reload,
    color: COLORS.purple,
    backgroundColor: COLORS.lightpurple,
    description: 'Istoric',
  },
  {
    id: 2,
    icon: icons.send,
    color: COLORS.yellow,
    backgroundColor: COLORS.lightyellow,
    description: 'Transfer',
  },
  {
    id: 3,
    icon: icons.wallet,
    color: COLORS.red,
    backgroundColor: COLORS.lightRed,
    description: 'Portofel',
  },
  {
    id: 4,
    icon: icons.bill,
    color: COLORS.yellow,
    backgroundColor: COLORS.lightyellow,
    description: 'Facturi',
  },
  {
    id: 5,
    icon: icons.more,
    color: COLORS.purple,
    backgroundColor: COLORS.lightpurple,
    description: 'More',
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
        if (item.description === 'Portofel') {
          navigation.navigate('Wallet')
        } else if (item.description === 'Istoric') {
          navigation.navigate('History')
        } else if (item.description === 'Transfer') {
          navigation.navigate('TransferScreen')
        } else {
          console.log(item.description)
        }
      }}
    >
      <View
        style={{
          height: 50,
          width: 50,
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
            height: 20,
            width: 20,
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
      ListHeaderComponent={<SubTitle>Comenzi Rapide</SubTitle>}
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
