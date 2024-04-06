import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuthContext } from './useAuthContext'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { useState } from 'react'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const logout = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const isSignedIn = await GoogleSignin.isSignedIn()
      if (isSignedIn) {
        await GoogleSignin.revokeAccess()
        await GoogleSignin.signOut()
      }
      await auth().signOut()
      await AsyncStorage.removeItem('userInfo')
      dispatch({ type: 'LOGOUT' })
      setIsLoading(false)
    } catch (error) {
      setError('A aparut o eroare de logout. Te rugam sa incerci mai tarziu')
      setIsLoading(false)
    }
  }
  return { logout, isLoading, error }
}
