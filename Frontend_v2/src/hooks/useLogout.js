import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuthContext } from './useAuthContext'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { useState } from 'react'
import { useWalletConnectModal } from '@walletconnect/modal-react-native'

export const useLogout = () => {
  const { isOpen, open, close, provider, isConnected, address } =
    useWalletConnectModal()

  const { dispatch } = useAuthContext()
  const [error, setError] = useState(null)

  const logout = async () => {
    try {
      const isSignedIn = await GoogleSignin.isSignedIn()
      console.log('isSignedIn:', isSignedIn)
      if (isSignedIn) {
        // await GoogleSignin.revokeAccess()
        await GoogleSignin.signOut()
      } else {
        const currentUser = auth().currentUser
        if (currentUser) {
          await auth().signOut()
        }
      }
      await AsyncStorage.removeItem('payload')
      if (isConnected && provider) {
        await provider.disconnect()
        console.log('Wallet disconnected successfully')
      } else {
        console.log('No wallet connected')
      }

      dispatch({ type: 'LOGOUT' })
      console.log('Logged out successfully')
    } catch (error) {
      setError('An error occurred during logout. Please try again later.')
      console.log('Logout error:', error)
    }
  }

  return { logout, error }
}
