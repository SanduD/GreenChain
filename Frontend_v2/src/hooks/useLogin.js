import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { BASE_URL } from '../constants/config'

//firebase auth
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { dispatch } = useAuthContext()

  const reset = () => {
    setIsLoading(true)
    setError(null)
  }

  const isValidEmail = email => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const login = async (email, password) => {
    reset()

    if (!email.trim() || !password.trim()) {
      setError('Te rog să completezi toate câmpurile.')
      setIsLoading(false)
      return
    }

    if (!isValidEmail(email)) {
      setError('Formatul adresei de e-mail nu este valid.')
      setIsLoading(false)
      return
    }

    try {
      const userCredentials = await auth().signInWithEmailAndPassword(
        email,
        password
      )
      console.log('User clasic firebase signed in!', userCredentials.user.email)

      try {
        const response = await axios.post(`${BASE_URL}/user/login`, {
          email: email,
        })
        if (response.status === 200) {
          await AsyncStorage.setItem('userInfo', JSON.stringify(response.data))
          dispatch({ type: 'LOGIN', payload: response.data })
        } else {
          setError(
            'A intervenit o eroare la autentificare. Te rugam sa incerci mai tarziu...'
          )
          setIsLoading(false)
        }
      } catch (error) {
        setError(
          'A intervenit o eroare la autentificare. Te rugam sa incerci mai tarziu...'
        )
        console.error(error)
        setIsLoading(false)
      }
    } catch (error) {
      setError(
        'Email / Parola sunt incorecte. Te rugam sa introduci datele din nou.'
      )
      console.error(error)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  const fcmRegistrationToken = 'Value_to_introduce_after_integration'

  const googleSignIn = async () => {
    reset()
    try {
      await GoogleSignin.hasPlayServices()
      const user = (await GoogleSignin.signIn()).user

      try {
        const response = await axios.post(`${BASE_URL}/user/login`, {
          email: user.email,
          name: user.name,
          photo: user.photo,
          fcmRegistrationToken: fcmRegistrationToken,
        })
        if (response.status === 200) {
          await AsyncStorage.setItem('userInfo', JSON.stringify(response.data))
          dispatch({ type: 'LOGIN', payload: response.data })
        } else {
          setError(
            'A intervenit o eroare la autentificare. Te rugam sa incerci mai tarziu...'
          )
          setIsLoading(false)
        }
      } catch (error) {
        setError(
          'A intervenit o eroare la autentificare. Te rugam sa incerci mai tarziu...'
        )
        console.error(error)
        setIsLoading(false)
      }
    } catch (error) {
      setError(
        'Eroare la autentificare cu Google. Te rugam sa incerci mai tarziu'
      )
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }
  return { login, googleSignIn, isLoading, error, reset }
}
