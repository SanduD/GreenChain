import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'

const History = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const fakeData = [
        {
          id: '1',
          scanType: 'PET',
          quantity: 5,
          rewardGRC: 20,
          savedAtDate: new Date().toISOString(),
        },
        {
          id: '2',
          scanType: 'Ticket',
          quantity: 3,
          rewardGRC: 15,
          savedAtDate: new Date().toISOString(),
        },
        {
          id: '3',
          scanType: 'Invoice',
          quantity: 1,
          rewardGRC: 10,
          savedAtDate: new Date().toISOString(),
        },
        {
          id: '4',
          scanType: 'Ticket',
          quantity: 4,
          rewardGRC: 11,
          savedAtDate: new Date().toISOString(),
        },
        {
          id: '5',
          scanType: 'Invoice',
          quantity: 1,
          rewardGRC: 100,
          savedAtDate: new Date().toISOString(),
        },
      ]
      setData(fakeData)
    }

    fetchData()
  }, [])

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>
        {item.scanType} - {item.quantity} items
      </Text>
      <Text style={styles.itemSubtitle}>{item.rewardGRC} GRC</Text>
      <Text style={styles.dateText}>
        {new Date(item.savedAtDate).toLocaleDateString()}
      </Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f9f9f9',
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  dateText: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 4,
  },
})

export default History
