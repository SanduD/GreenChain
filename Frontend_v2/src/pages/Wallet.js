import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
// import {
//   WalletConnectModal,
//   useWalletConnectModal,
// } from '@walletconnect/modal-react-native'
import { Colors } from '../components/styles'
import { COLORS, SIZES } from '../constants'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useAuthContext } from '../hooks/useAuthContext'
import { BASE_URL } from '../constants/config'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'

// const projectId = 'b14f479057c1f8360f22b46dcf75f24b'

// const providerMetadata = {
//   name: 'GreenChain',
//   description: 'Welcome to greenChain',
//   url: 'greenchain.com',
//   icons: require('../assets/images/banner.jpg'),
//   redirect: {
//     native: 'YOUR_APP_SCHEME://',
//     universal: 'YOUR_APP_UNIVERSAL_LINK.com',
//   },
// }

// const transactions = [
//   { id: 1, type: 'Received', amount: '150 GRC', date: '2024-04-15' },
//   { id: 2, type: 'Sent', amount: '30 GRC', date: '2024-04-14' },
//   { id: 3, type: 'Received', amount: '200 GRC', date: '2024-04-13' },
//   { id: 4, type: 'Received', amount: '200 GRC', date: '2024-04-13' },
//   { id: 5, type: 'Received', amount: '200 GRC', date: '2024-04-13' },
//   { id: 6, type: 'Received', amount: '200 GRC', date: '2024-04-13' },
//   { id: 7, type: 'Received', amount: '200 GRC', date: '2024-04-13' },
//   { id: 8, type: 'Received', amount: '200 GRC', date: '2024-04-13' },
// ]

async function fetchTransactions(userId) {
  const url = `${BASE_URL}/api/users/transactions/${userId}`
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Error fetching transactions: ${response.statusText}`)
    }
    const data = await response.json()

    return data
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}
const processTransactions = (transactions, walletAddress) => {
  return transactions.map((transaction, index) => {
    const { from, to, value, rawContract, asset, category, date } = transaction

    const isReceived = from.toLowerCase() !== walletAddress.toLowerCase()
    const type = isReceived ? 'Received' : 'Sent'

    let amount
    if (value !== null) {
      amount = `${parseFloat(value).toFixed(2)} ${asset || 'ETH'}`
    } else if (rawContract && rawContract.value) {
      const formattedValue = (
        parseInt(rawContract.value, 16) /
        Math.pow(
          10,
          rawContract.decimal ? parseInt(rawContract.decimal, 16) : 18
        )
      ).toFixed(2)
      amount = `${formattedValue} GRC`
    } else {
      amount = 'N/A'
    }
    return {
      id: index + 1,
      type,
      amount,
      date,
    }
  })
}

const Wallet = ({ navigation }) => {
  // const { isOpen, open, close, provider, isConnected, address } =
  //   useWalletConnectModal()
  // const onPress = () => (isConnected ? provider.disconnect() : open())

  const { userInfo, balanceGRC } = useAuthContext()
  const address = userInfo?.user?.walletAddress
  const [allTransactions, setAllTransactions] = useState([])

  const getTransactions = async () => {
    const result = await fetchTransactions(userInfo.user._id)
    setAllTransactions(result.transactions)
    // console.log(result)
  }
  let transactions = []

  if (userInfo) {
    transactions = processTransactions(
      allTransactions,
      userInfo.user.walletAddress
    )
  }

  useEffect(() => {
    getTransactions()
  }, [])

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
      <Image
        source={require('../assets/images/walletBanner.png')}
        style={styles.walletImage}
      />
      {/* {isConnected ? (
        <TouchableOpacity style={styles.buttonDisconnect} onPress={onPress}>
          <Text style={styles.buttonDisconnectText}>Disconnect</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.buttonConnect} onPress={onPress}>
          <Text style={styles.buttonText}>Connect Wallet</Text>
        </TouchableOpacity>
      )} */}
      {/* {isConnected && ( */}
      <>
        <Text style={styles.walletAddress}>{address}</Text>

        <Text style={styles.balanceTitle}>Balance</Text>
        <Text style={styles.balance}>{balanceGRC} GRC</Text>
        <View style={styles.separator} />
        <ScrollView>
          <View style={styles.transactionContainer}>
            {transactions.map(transaction => (
              <View key={transaction.id} style={styles.transaction}>
                <Text style={styles.transactionText}>
                  {transaction.type} - {transaction.amount} on{' '}
                  {transaction.date}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </>
      {/* )} */}
      {/* <WalletConnectModal
        projectId={projectId}
        providerMetadata={providerMetadata}
      /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.lightGreen,
  },
  walletImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  walletAddress: {
    fontSize: 18,
    color: Colors.primary,
    textAlign: 'center',
  },
  balanceTitle: {
    fontSize: 24,
    color: Colors.secondary,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
  balance: {
    fontSize: 18,
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  separator: {
    height: 2,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
  transactionContainer: {
    marginBottom: 20,
  },
  transaction: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  transactionText: {
    fontSize: 16,
    color: '#333',
  },
  buttonText: {
    color: Colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },

  buttonConnect: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 25,
    width: '50%',
    alignSelf: 'center',
    margin: 10,
  },
  buttonDisconnectText: {
    color: COLORS.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonDisconnect: {
    backgroundColor: COLORS.red,
    padding: 10,
    borderRadius: 25,
    width: '50%',
    alignSelf: 'center',
    margin: 10,
  },
})

export default Wallet
