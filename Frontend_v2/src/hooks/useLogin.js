import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { BASE_URL, AVERAGE_KWH } from '../constants/config'

// Firebase auth
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

export const useLogin = () => {
  const { dispatch } = useAuthContext()

  const isValidEmail = email => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const login = async (email, password) => {
    if (!email.trim() || !password.trim()) {
      return [false, 'Please fill in all fields.']
    }

    if (!isValidEmail(email)) {
      return [false, 'The email format is not valid.']
    }

    try {
      const userCredentials = await auth().signInWithEmailAndPassword(
        email,
        password
      )
      // console.log('User signed in with Firebase!', userCredentials.user.email)

      const response = await axios.post(`${BASE_URL}/api/users/login`, {
        email,
      })
      console.log('response:', response.data)
      if (response.status === 200) {
        await AsyncStorage.setItem('email', user.email)

        return [true, null]
      } else {
        return [
          false,
          'An error occurred during authentication. Please try again later...',
        ]
      }
    } catch (error) {
      // console.error(error)
      return [false, 'Email/Password is incorrect. Please try again.']
    }
  }

  const fcmRegistrationToken = 'Value_to_introduce_after_integration'

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const user = (await GoogleSignin.signIn()).user
      console.log('user:', user)

      const response = await axios.post(`${BASE_URL}/api/users/login`, {
        email: user.email,
        name: user.name,
        photo: user.photo,
        fcmRegistrationToken: fcmRegistrationToken,
      })
      console.log(response.data)
      if (response.status === 200) {
        await AsyncStorage.setItem('email', user.email)

        return [true, user.email]
      } else {
        return [
          false,
          'An error occurred during authentication. Please try again later...',
        ]
      }
    } catch (error) {
      // console.error(error)
      return [
        false,
        'Error during Google authentication. Please try again later.',
        // error.message,
      ]
    }
  }

  const fetchBottles = async userId => {
    try {
      const response = await axios.get(`${BASE_URL}/api/bottles/${userId}`)
      return response.data.bottles.length
    } catch (error) {
      console.log('Error fetching bottles:', error)
      return 0
    }
  }

  const fetchTickets = async userId => {
    try {
      const response = await axios.get(`${BASE_URL}/api/tickets/${userId}`)
      return response.data.tickets.length
    } catch (error) {
      console.log('Error fetching tickets:', error)
      return 0
    }
  }

  const fetchBills = async userId => {
    try {
      const response = await axios.get(`${BASE_URL}/api/bills/${userId}`)
      const bills = response.data.bills
      console.log('bills:', bills)

      const totalKhwReduced = bills.reduce((sum, bill) => {
        const khwReduced = AVERAGE_KWH - parseInt(bill.quantity)
        return sum + (khwReduced > 0 ? khwReduced : 0)
      }, 0)

      return totalKhwReduced
    } catch (error) {
      console.log('Error fetching bills:', error)
      return 0
    }
  }
  const fetchBalanceGRC = async userId => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/users/wallet-balance/${userId}`
      )
      return response.data
    } catch (error) {
      console.log('Error fetching balance:', error)
      return 0
    }
  }

  const walletAuth = async walletAddress => {
    try {
      const email = await AsyncStorage.getItem('email')

      if (!email) {
        throw new Error('Email not found in AsyncStorage')
      }

      await AsyncStorage.removeItem('email')

      const response = await axios.post(`${BASE_URL}/api/users/wallet-auth`, {
        email: email,
        walletAddress: walletAddress,
      })

      if (response.status === 200) {
        const userInfo = response.data

        const balanceGRC = await fetchBalanceGRC(userInfo.user._id)
        console.log('balanceGRC:', balanceGRC)
        const bottles = await fetchBottles(userInfo.user._id)
        const ticketsUsed = await fetchTickets(userInfo.user._id)
        const kwhReduced = await fetchBills(userInfo.user._id)

        const payload = {
          userInfo,
          balanceGRC: parseFloat(balanceGRC.balance),
          bottles,
          ticketsUsed,
          kwhReduced,
        }

        await AsyncStorage.setItem('payload', JSON.stringify(payload))
        dispatch({ type: 'LOGIN', payload: payload })
        return [true, null]
      } else {
        return [false, 'An error occurred during wallet authentication.']
      }
    } catch (error) {
      console.log('Error during wallet authentication:', error)
      return [
        false,
        'Error during wallet authentication. Please try again later.',
      ]
    }
  }

  const walletAuthForNewUser = async (email, walletAddress) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/users/wallet-auth`, {
        email: email,
        walletAddress: walletAddress,
      })

      if (response.status === 200) {
        const userInfo = response.data

        const payload = {
          userInfo,
        }

        await AsyncStorage.setItem('payload', JSON.stringify(payload))
        dispatch({ type: 'LOGIN', payload: payload })
        return [true, null]
      } else {
        return [false, 'An error occurred during wallet authentication.']
      }
    } catch (error) {
      console.log('Error during wallet authentication:', error)
      return [
        false,
        'Error during wallet authentication. Please try again later.',
      ]
    }
  }

  return { login, googleSignIn, walletAuth, walletAuthForNewUser }
}
