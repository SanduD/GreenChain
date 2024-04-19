import * as DropdownMenu from 'zeego/dropdown-menu'
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native'
import { icons, COLORS } from '../constants'
import { Colors } from './styles'

const Dropdown = () => {
  const menuItems = [
    {
      id: 'notif1',
      title: 'Felicitari!',
    },
    {
      id: 'notif2',
      title: 'Felicitari! O noua recompensa a fost deblocata',
    },
    {
      id: 'notif3',
      title: 'Felicitari! O noua recompensa a fost deblocata',
    },
    {
      id: 'notif4',
      title: 'Felicitari! O noua recompensa a fost deblocata',
    },
  ]

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <TouchableOpacity style={styles.moreButton}>
          <Image source={icons.bell} style={styles.profileIcon} />
          <View
            style={{
              position: 'absolute',
              top: -5,
              right: -5,
              height: 10,
              width: 10,
              backgroundColor: COLORS.red,
              borderRadius: 5,
            }}
          ></View>
        </TouchableOpacity>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content style={styles.dropdownContent}>
        {menuItems.map(menuItem => (
          <DropdownMenu.Item key={menuItem.id}>
            <DropdownMenu.ItemImage
              source={icons.bell}
              height={15}
              width={15}
            />
            <DropdownMenu.ItemTitle>{menuItem.title}</DropdownMenu.ItemTitle>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

const styles = StyleSheet.create({
  moreButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.secondary,
  },
  moreButtonText: {
    color: 'white',
    fontSize: 12,
  },
  profileIcon: {
    width: 30,
    height: 30,
  },
})
export default Dropdown
