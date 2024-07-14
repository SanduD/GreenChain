import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useAuthContext } from '../hooks/useAuthContext'
import axios from 'axios'
import { BASE_URL, AVERAGE_KWH } from '../constants/config'

const History = () => {
  const { userInfo } = useAuthContext()
  const [data, setData] = useState([])
  const userId = userInfo?.user._id

  useEffect(() => {
    const fetchData = async () => {
      try {
        const billsResponse = await axios.get(`${BASE_URL}/api/bills/${userId}`)
        const bottlesResponse = await axios.get(
          `${BASE_URL}/api/bottles/${userId}`
        )
        const ticketsResponse = await axios.get(
          `${BASE_URL}/api/tickets/${userId}`
        )

        const billsData = billsResponse.data.bills.map(bill => ({
          id: bill._id,
          scanType: 'Bill',
          quantity:
            AVERAGE_KWH - bill.quantity > 0 ? AVERAGE_KWH - bill.quantity : 0,
          rewardGRC: bill.rewardGRC,
          savedAtDate: bill.savedAtDate,
        }))

        const bottlesData = bottlesResponse.data.bottles.map(bottle => ({
          id: bottle._id,
          scanType: 'PET',
          quantity: bottle.quantity,
          rewardGRC: bottle.rewardGRC,
          savedAtDate: bottle.savedAtDate,
        }))

        const ticketsData = ticketsResponse.data.tickets.map(ticket => ({
          id: ticket._id,
          scanType: 'Ticket',
          quantity: 1,
          rewardGRC: ticket.rewardGRC,
          savedAtDate: ticket.savedAtDate,
        }))

        const combinedData = [...billsData, ...bottlesData, ...ticketsData]

        combinedData.sort(
          (a, b) => new Date(b.savedAtDate) - new Date(a.savedAtDate)
        )

        setData(combinedData)
      } catch (error) {
        console.log('Error fetching data:', error)
      }
    }

    fetchData()
  }, [userId])

  const renderItem = ({ item }) => {
    let description

    switch (item.scanType) {
      case 'Bill':
        description = `KWH Reduced: ${item.quantity}`
        break
      case 'PET':
        description = `${item.quantity} Recycled`
        break
      case 'Ticket':
        description = `${item.quantity} Ticket Used`
        break
      default:
        description = `${item.quantity} items`
    }

    return (
      <View style={styles.item}>
        <Text style={styles.itemTitle}>{item.scanType}</Text>
        <Text style={styles.itemSubtitle}>{item.rewardGRC} GRC</Text>
        <Text style={styles.dateText}>
          {new Date(item.savedAtDate).toLocaleDateString()}
        </Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
    )
  }

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
    color: '#666',
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
  descriptionText: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
})

export default History
