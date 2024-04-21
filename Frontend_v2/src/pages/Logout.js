import React from 'react'
import { View, Text, Button } from 'react-native'

const LogoutScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Are you sure you want to logout?</Text>
      <Button
        title="Logout"
        onPress={() => console.log('Log out logic here')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  )
}
export default LogoutScreen
