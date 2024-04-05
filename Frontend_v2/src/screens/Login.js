/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
//icons
import Icon from 'react-native-vector-icons/FontAwesome'

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  StyledFormArea,
  LeftIcon,
  RightIcon,
  StyledButton,
  StyledInputLabel,
  StyledTextInput,
  Colors,
  ButtonText,
  Line,
} from '../components/styles'
import { Formik } from 'formik'
import { View, Alert } from 'react-native'

import { GoogleSignin } from '@react-native-google-signin/google-signin'

import auth from '@react-native-firebase/auth'

//Colors
const { brand, accent1, primary } = Colors

//keyboard avoiding view

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState()
  const [user, setUser] = useState(null)

  // const auth = FIREBASE_AUTH;

  const isValidEmail = email => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const handleLogIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Eroare', 'Te rog să completezi toate câmpurile.')
      return
    }

    // Verifică formatul e-mailului
    if (!isValidEmail(email)) {
      Alert.alert('Eroare', 'Formatul adresei de e-mail nu este valid.')
      return
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        setUser(userCredentials.user)
        console.log('User signed in!')
        navigation.navigate('HomeTabs')
      })
      .catch(error => {
        console.error(error)
      })
  }

  const handleSignUp = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Eroare', 'Te rog să completezi toate câmpurile.')
      return
    }

    // Verifică formatul e-mailului
    if (!isValidEmail(email)) {
      Alert.alert('Eroare', 'Formatul adresei de e-mail nu este valid.')
      return
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        setUser(userCredentials.user)
        console.log('User account created & signed in!')
        navigation.navigate('HomeTabs')
      })
      .catch(error => {
        console.error(error)
      })
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '930675864297-lktl7hananjjjbfob2mo7m8pjma5m3ir.apps.googleusercontent.com',
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    })
  }, [])

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const user = await GoogleSignin.signIn()
      setUser(user)
      console.log(user)
      setError(null)
      navigation.navigate('HomeTabs')
    } catch (error) {
      alert(error)
    }
  }

  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => {
        setUser(null)
        console.log('User signed out!')
      })
      .catch(error => {
        console.error(error)
      })

    GoogleSignin.signOut()
      .then(() => {
        setUser(null)
        console.log('Google sign out')
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <InnerContainer>
          <PageLogo
            resizeMode="cover"
            source={require('./../assets/img/logo.png')}
          ></PageLogo>
          <PageTitle>Welcome!</PageTitle>

          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={values => {
              console.log(values)
              navigation.navigate('HomeTabs')
            }}
          >
            {({ handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Email Address"
                  icon="envelope"
                  placeholder="example@gmail.com"
                  placeholderTextColor={accent1}
                  onChangeText={text => setEmail(text)}
                  onBlur={handleBlur('email')}
                  value={email}
                  keyboardType="email-address"
                />

                <MyTextInput
                  label="Password"
                  icon="lock"
                  placeholder="* * * * * * * * * *"
                  placeholderTextColor={accent1}
                  onChangeText={text => setPassword(text)}
                  onBlur={handleBlur('password')}
                  value={password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}
                >
                  <StyledButton onPress={handleLogIn}>
                    <ButtonText>Login</ButtonText>
                  </StyledButton>

                  <StyledButton onPress={handleSignUp}>
                    <ButtonText>Register</ButtonText>
                  </StyledButton>
                </View>

                <Line />

                <StyledButton google={true} onPress={handleGoogleSignIn}>
                  <Icon name="google" color={primary} size={25} />
                  <ButtonText google={true}>Sign in with Google</ButtonText>
                </StyledButton>

                {/* <ExtraView>
                  <ExtraText>Don't have an account already?</ExtraText>
                  <TextLink onPress={() => navigation.navigate('Signup')}>
                    <TextLinkContent> SignUp</TextLinkContent>
                  </TextLink>
                </ExtraView> */}
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  )
}

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Icon name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Icon
            name={hidePassword ? 'eye-slash' : 'eye'}
            size={30}
            color={accent1}
          ></Icon>
        </RightIcon>
      )}
    </View>
  )
}

export default Login
