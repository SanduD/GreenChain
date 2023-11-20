import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  RightIcon,
  StyledButton,
  StyledInputLabel,
  StyledTextInput,
  Colors,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from './../components/styles';
import { Formik } from 'formik';
import { View } from 'react-native';

import { FIREBASE_AUTH } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

//Colors

const { brand, accent1, primary } = Colors;

//keyboard avoiding view

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
//mention in documentation that you have problem with firebase.js version
//and with virtual manager divices with network connectivity
//version incompatibility
const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = FIREBASE_AUTH;

  const handleLogIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Welcome');
      console.log(response);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('Welcome');
      console.log(response);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark"></StatusBar>
        <InnerContainer>
          <PageLogo resizeMode="cover" source={require('./../assets/img/logo.png')}></PageLogo>
          <PageTitle>Welcome!</PageTitle>
          <SubTitle>Account Login</SubTitle>

          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={values => {
              console.log(values);
              navigation.navigate('Welcome');
            }}
          >
            {({ handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Email Address"
                  icon="mail"
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

                <StyledButton onPress={handleLogIn}>
                  <ButtonText>Login</ButtonText>
                </StyledButton>

                <StyledButton onPress={handleSignUp}>
                  <ButtonText>Register</ButtonText>
                </StyledButton>

                <Line />

                <StyledButton google={true} onPress={handleSubmit}>
                  <Fontisto name="google" color={primary} size={25} />
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
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={accent1}></Ionicons>
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
