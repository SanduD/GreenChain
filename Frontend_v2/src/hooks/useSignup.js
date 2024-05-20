import { useState } from 'react'
import { Alert } from 'react-native'
import { useAuthContext } from './useAuthContext'
import { BASE_URL } from '../constants/config'

// Firebase auth
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export const useSignUp = () => {
  const { dispatch } = useAuthContext()

  const isValidEmail = email => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const signUp = async ({ email, password, firstName, lastName }) => {
    if (
      !email.trim() ||
      !password.trim() ||
      !firstName.trim() ||
      !lastName.trim()
    ) {
      return [false, 'Please fill in all fields.']
    }

    if (!isValidEmail(email)) {
      return [false, 'Invalid email format.']
    }

    const fcmRegistrationToken = 'Value_to_introduce_after_integration'
    const photoLink =
      'https://www.flaticon.com/free-icon/user_3177440?term=user&page=1&position=8&origin=search&related_id=3177440'

    try {
      const userCredentials = await auth().createUserWithEmailAndPassword(
        email,
        password
      )
      console.log('User account created & signed in!', userCredentials.user)

      const userData = {
        email,
        name: firstName + ' ' + lastName,
        photo: photoLink,
        fcmRegistrationToken: fcmRegistrationToken,
      }

      try {
        const response = await axios.post(
          `${BASE_URL}/api/users/login`,
          userData
        )
        if (response.status === 200) {
          // await AsyncStorage.setItem('userInfo', JSON.stringify(response.data))
          // dispatch({ type: 'LOGIN', payload: response.data })
          return [true, null]
        } else {
          return [
            false,
            'An error occurred during registration. Please try again later.',
          ]
        }
      } catch (error) {
        return [
          false,
          'An error occurred during registration. Please try again later.',
        ]
      }
    } catch (error) {
      return [
        false,
        'An error occurred while creating the account. Please try again.',
      ]
    }
  }

  return { signUp }
}
