import React, { useState, useEffect } from 'react'
import { View, Alert, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Formik } from 'formik'
import auth from '@react-native-firebase/auth'

import {
  StyledContainer,
  InnerContainer,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  StyledButton,
  ButtonText,
  Colors,
  RightIcon,
} from '../components/styles'

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'
import VideoComponent from '../components/videoComponent'
import { useSignUp } from '../hooks/useSignup'
import InfoModal from '../components/InfoModal'
import { useNavigation } from '@react-navigation/native'

const { brand, accent1 } = Colors

const Register = () => {
  const [isModalVisible, setModalVisible] = useState(false)
  const [hidePassword, setHidePassword] = useState(true)
  const navigation = useNavigation()

  const { signUp, error, isLoading, reset } = useSignUp()

  const handleCloseModal = () => {
    setModalVisible(false)
    reset()
  }

  const handleSignUp = async values => {
    setModalVisible(false)
    await signUp({
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
    })
    if (!isLoading) {
      if (error != null) {
        setModalVisible(true)
      } else {
        console.log(isLoading)
        navigation.navigate('HomeTabs')
      }
    }

    console.log('\nREGISTER\nLoading:', isLoading, '\nError:', error)

    console.log('\nREGISTER DONE')
  }

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <InnerContainer>
          <VideoComponent
            source={require('./../assets/video/greenRegister.mp4')}
          />

          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
            }}
            onSubmit={handleSignUp}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Nume"
                  icon="user"
                  placeholder="Nume"
                  placeholderTextColor={accent1}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                />

                <MyTextInput
                  label="Prenume"
                  icon="user-o"
                  placeholder="Prenume"
                  placeholderTextColor={accent1}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                />

                <MyTextInput
                  label="Email Address"
                  icon="envelope"
                  placeholder="example@gmail.com"
                  placeholderTextColor={accent1}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />

                <MyTextInput
                  label="Password"
                  icon="lock"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={accent1}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <StyledButton
                    onPress={handleSubmit}
                    style={{ marginTop: 40, marginBottom: 40 }}
                  >
                    <ButtonText>Register</ButtonText>
                  </StyledButton>
                  <InfoModal
                    isVisible={isModalVisible}
                    onClose={handleCloseModal}
                    content={error}
                  />
                </View>
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
          />
        </RightIcon>
      )}
    </View>
  )
}

export default Register
