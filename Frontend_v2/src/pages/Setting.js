import React, { useState } from 'react'
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native'
import { COLORS, SIZES } from '../constants'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Colors } from '../components/styles'

const SettingScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => setIsEnabled(previousState => !previousState)

  const openDrawer = () => {
    navigation.openDrawer()
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
        <Icon name="bars" size={24} color={Colors.primary} />
      </TouchableOpacity>
      <View style={styles.settingOption}>
        <Text style={styles.settingText}>Push Notifications</Text>
        <Switch
          trackColor={{ false: '#767577', true: Colors.secondary }}
          thumbColor={isEnabled ? Colors.primary : Colors.secondary}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={styles.settingOption}>
        <Text style={styles.settingText}>Help</Text>
        <TouchableOpacity
          onPress={() => {
            /* navigate to Help screen */
          }}
        >
          <Icon name="question-circle" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.settingOption}>
        <Text style={styles.settingText}>About</Text>
        <TouchableOpacity
          onPress={() => {
            /* navigate to About screen */
          }}
        >
          <Icon name="info-circle" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <Text style={styles.copyRightText}>© Sandu Dragos Bachelor's Thesis</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGreen,
    padding: SIZES.padding * 3,
  },
  menuButton: {
    marginBottom: 20,
  },
  settingOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  settingText: {
    fontSize: 18,
    color: Colors.primary,
  },
  copyRightText: {
    marginTop: '150%',
    fontSize: 12,
    textAlign: 'center',
    color: Colors.secondary,
  },
})

export default SettingScreen
