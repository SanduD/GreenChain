import React, { useState, useEffect } from 'react';
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
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

//Colors

const { brand, accent1, primary } = Colors;

//keyboard avoiding view

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const [userInfo, setUserInfo] = useState(null);
  const auth = FIREBASE_AUTH;

  const handleLogIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('HomeTabs');
      console.log(response);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('HomeTabs');
      console.log(response);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '896289313512-cmnr9mpdfq447kvqbtr616nch6llehg5.apps.googleusercontent.com',
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      setUserInfo(user);
      console.log(user);
      setError(null);
      navigation.navigate('HomeTabs');
    } catch (error) {
      alert(error.message);
    }
  };

  const logout = () => {
    setUserInfo();
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark"></StatusBar>
        <InnerContainer>
          <PageLogo resizeMode="cover" source={require('./../assets/img/logo.png')}></PageLogo>
          <PageTitle>Welcome!</PageTitle>

          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={values => {
              console.log(values);
              navigation.navigate('HomeTabs');
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

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                  <StyledButton onPress={handleLogIn}>
                    <ButtonText>Login</ButtonText>
                  </StyledButton>

                  <StyledButton onPress={handleSignUp}>
                    <ButtonText>Register</ButtonText>
                  </StyledButton>
                </View>

                <Line />

                <StyledButton google={true} onPress={handleGoogleSignIn}>
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
