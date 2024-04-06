import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useEffect, useReducer } from 'react'

export const AuthContext = createContext()
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userInfo: action.payload,
      }

    case 'LOGOUT':
      return { ...state, userInfo: null }

    default:
      return state
  }
}
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    userInfo: null,
  })

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userJSON = await AsyncStorage.getItem('userInfo')
        const userInfo = JSON.parse(userJSON)

        if (userInfo) {
          dispatch({ type: 'LOGIN', payload: { userInfo } })
        }
      } catch (error) {
        console.error('Failed to fetch userInfo from storage:', error)
      }
    }

    checkLoginStatus()
  }, [])

  console.log('AuthContext state', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
