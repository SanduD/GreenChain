import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import {
  WalletConnectModal,
  useWalletConnectModal,
} from '@walletconnect/modal-react-native'
import { Colors } from '../components/styles'
import { COLORS, SIZES } from '../constants'
import Icon from 'react-native-vector-icons/FontAwesome'

const projectId = 'b14f479057c1f8360f22b46dcf75f24b'

const providerMetadata = {
  name: 'GreenChain',
  description: 'Welcome to greenChain',
  url: 'greenchain.com',
  icons: require('../assets/images/banner.jpg'),
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com',
  },
}

const transactions = [
  { id: 1, type: 'Received', amount: '150 GRC', date: '2024-04-15' },
  { id: 2, type: 'Sent', amount: '30 GRC', date: '2024-04-14' },
  { id: 3, type: 'Received', amount: '200 GRC', date: '2024-04-13' },
  { id: 4, type: 'Received', amount: '200 GRC', date: '2024-04-13' },
  { id: 5, type: 'Received', amount: '200 GRC', date: '2024-04-13' },
  { id: 6, type: 'Received', amount: '200 GRC', date: '2024-04-13' },
  { id: 7, type: 'Received', amount: '200 GRC', date: '2024-04-13' },
  { id: 8, type: 'Received', amount: '200 GRC', date: '2024-04-13' },
]

const Wallet = ({ navigation }) => {
  const { isOpen, open, close, provider, isConnected, address } =
    useWalletConnectModal()
  const onPress = () => (isConnected ? provider.disconnect() : open())

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
      <TouchableOpacity onPress={onPress}>
        <Text style={{ color: COLORS.primary, textAlign: 'center' }}>
          {isConnected ? 'Disconnect' : 'Connect Wallet'}
        </Text>
      </TouchableOpacity>
      {isConnected && (
        <>
          <Text style={styles.walletAddress}>{address}</Text>

          <Text style={styles.balanceTitle}>Balance</Text>
          <Text style={styles.balance}>1,000 GRC</Text>
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
      )}
      <WalletConnectModal
        projectId={projectId}
        providerMetadata={providerMetadata}
      />
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
})

export default Wallet
