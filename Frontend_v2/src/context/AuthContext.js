import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useEffect, useReducer } from 'react'

// Create the context
export const AuthContext = createContext()

// Define the reducer
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userInfo: action.payload.userInfo,
        authChecked: true,
        activeDays: action.payload.userInfo.user.activeDays || [],
        balanceGRC: action.payload.balanceGRC || 0,
        bottles: action.payload.bottles || 0,
        kwhReduced: action.payload.kwhReduced || 0,
        ticketsUsed: action.payload.ticketsUsed || 0,
      }
    case 'LOGOUT':
      return {
        ...state,
        userInfo: null,
        authChecked: true,
        activeDays: [],
        balanceGRC: 0,
        bottles: 0,
        kwhReduced: 0,
        ticketsUsed: 0,
      }
    case 'AUTH_CHECKED':
      return { ...state, authChecked: true }
    case 'UPDATE_ACTIVE_DAYS':
      return { ...state, activeDays: [...state.activeDays, action.payload] }
    case 'UPDATE_BALANCE_GRC':
      return { ...state, balanceGRC: state.balanceGRC + action.payload }
    case 'UPDATE_BOTTLES':
      return { ...state, bottles: state.bottles + action.payload }
    case 'UPDATE_KWH_REDUCED':
      return { ...state, kwhReduced: state.kwhReduced + action.payload }
    case 'UPDATE_TICKETS_USED':
      return { ...state, ticketsUsed: state.ticketsUsed + action.payload }

    default:
      return state
  }
}

// Context provider component
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    userInfo: null,
    authChecked: false,
    activeDays: [],
    balanceGRC: 0,
    bottles: 0,
    kwhReduced: 0,
    ticketsUsed: 0,
  })

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const payloadJSON = await AsyncStorage.getItem('payload')
        const payload = JSON.parse(payloadJSON)

        if (payload) {
          dispatch({ type: 'LOGIN', payload: payload })
        } else {
          dispatch({ type: 'AUTH_CHECKED' })
        }
      } catch (error) {
        console.error('Failed to fetch userInfo from storage:', error)
        dispatch({ type: 'AUTH_CHECKED' })
      }
    }

    checkLoginStatus()
  }, [])

  console.log('AuthContext state', JSON.stringify(state, null, 2))

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
