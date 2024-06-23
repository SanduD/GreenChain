import React, { useState, useEffect, useMemo } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  Text,
  Image,
} from 'react-native'
import moment from 'moment'
import { Colors } from './styles'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Schedule() {
  const [value, setValue] = useState(new Date())

  const { activeDays } = useAuthContext()
  console.log('Active days schedule:', activeDays)

  const visitedDays = useMemo(
    () => activeDays.map(dateString => dateString.split('T')[0]),
    [activeDays]
  )

  const currentWeekDays = useMemo(() => {
    const startOfWeek = moment().startOf('week')
    return Array.from({ length: 7 }).map((_, index) => {
      const date = moment(startOfWeek).add(index, 'day')
      return {
        weekday: date.format('ddd'),
        date: date.toDate(),
        dateString: date.format('YYYY-MM-DD'),
        visited: visitedDays.includes(date.format('YYYY-MM-DD')),
      }
    })
  }, [visitedDays])

  const handleDayPress = async item => {
    console.log('Day pressed:', item.dateString)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={[styles.itemRow]}>
          {currentWeekDays.map((item, dateIndex) => {
            const isActive = value.toDateString() === item.date.toDateString()
            return (
              <TouchableWithoutFeedback
                key={dateIndex}
                onPress={() => handleDayPress(item)}
              >
                <View
                  style={[
                    styles.item,
                    isActive && styles.activeItem,
                    item.visited,
                  ]}
                >
                  <Text
                    style={[styles.itemWeekday, isActive && styles.activeText]}
                  >
                    {item.weekday}
                  </Text>
                  <Text
                    style={[styles.itemDate, isActive && styles.activeText]}
                  >
                    {item.date.getDate()}
                  </Text>
                  <Image
                    style={styles.icon}
                    source={
                      item.visited
                        ? require('../assets/icons/recycle_symbol.png')
                        : require('../assets/icons/non_recyclable.png')
                    }
                  />
                </View>
              </TouchableWithoutFeedback>
            )
          })}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    marginTop: '-10%',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginHorizontal: -4,
  },
  item: {
    flex: 1,
    height: 75,
    marginHorizontal: 4,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#e3e3e3',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.tertiary,
  },
  activeItem: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  itemWeekday: {
    fontSize: 14,
    fontWeight: '500',
    color: '#737373',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  activeText: {
    color: '#fff',
  },

  icon: {
    width: 20,
    height: 20,
    marginTop: 4,
  },
})
