/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
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
//Colors
const { brand, accent1, primary } = Colors
//keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'
import { useLogin } from '../hooks/useLogin'
import InfoModal from '../components/InfoModal'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigation } from '@react-navigation/native'
import VideoComponent from '../components/videoComponent'

const Login = () => {
  const [hidePassword, setHidePassword] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isModalVisible, setModalVisible] = useState(false)

  const navigation = useNavigation()

  const { login, googleSignIn, isLoading, error, reset } = useLogin()

  const handleCloseModal = () => {
    setModalVisible(false)
    reset()
  }

  const handleLogIn = async () => {
    setModalVisible(false)
    await login(email, password)
  }

  const handleRegisterButton = () => {
    navigation.navigate('Register')
  }

  const handleGoogleSignIn = async () => {
    setModalVisible(false)
    await googleSignIn()

    if (!isLoading) {
      if (error != null) {
        setModalVisible(true)
      } else {
        navigation.navigate('HomeTabs')
      }
    }
    console.log('\nLoading:', isLoading, '\nError:', error)
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '930675864297-lktl7hananjjjbfob2mo7m8pjma5m3ir.apps.googleusercontent.com',
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    })
    // if (!isLoading) {
    //   if (error != null) {
    //     setModalVisible(true)
    //   } else {
    //     navigation.navigate('HomeTabs')
    //   }
    // }

    console.log('\nLoading:', isLoading, '\nError:', error)
  }, [isLoading, error])

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <InnerContainer>
          <VideoComponent
            source={require('./../assets/video/greenLogin.mp4')}
          />
          <PageTitle>Welcome!</PageTitle>

          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={values => {
              console.log(values)
              //navigation.navigate('HomeTabs')
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

                  <StyledButton onPress={handleRegisterButton}>
                    <ButtonText>Register</ButtonText>
                  </StyledButton>
                </View>

                <Line />

                <StyledButton google={true} onPress={handleGoogleSignIn}>
                  <Icon name="google" color={primary} size={25} />
                  <ButtonText google={true}>Sign in with Google</ButtonText>
                </StyledButton>
                <InfoModal
                  isVisible={isModalVisible}
                  onClose={handleCloseModal}
                  content={error}
                />

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
