import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

//phone number
import CountryPicker from 'react-native-country-picker-modal';

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

const Login = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const auth = FIREBASE_AUTH;

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark"></StatusBar>
        <InnerContainer>
          <PageLogo resizeMode="cover" source={require('./../assets/img/logo.png')}></PageLogo>
          <PageTitle>Welcome!</PageTitle>
          <SubTitle>Account Login</SubTitle>

          <Formik
            initialValues={{}}
            onSubmit={values => {
              console.log(values);
              navigation.navigate('Welcome');
            }}
          >
            {({ handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Phone Number"
                  icon="device-mobile"
                  placeholder="+4072041222"
                  placeholderTextColor={accent1}
                  onChangeText={text => setPhone(text)}
                  value={phone}
                  keyboardType="phone-pad"
                  isPhone={true}
                />

                <StyledButton onPress={handleLogIn}>
                  <ButtonText>Sign In</ButtonText>
                </StyledButton>

                <Line />

                <StyledButton google={true} onPress={handleSubmit}>
                  <Fontisto name="google" color={primary} size={25} />
                  <ButtonText google={true}>Sign in with Google</ButtonText>
                </StyledButton>

                <ExtraView>
                  <ExtraText>Don't have an account already?</ExtraText>
                  <TextLink onPress={() => navigation.navigate('Signup')}>
                    <TextLinkContent> SignUp</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isPhone, ...props }) => {
  const [countryCode, setCountryCode] = useState('RO'); // Setează codul de țară implicit
  const [country, setCountry] = useState(null);

  const onSelect = country => {
    setCountryCode(country.cca2);
    setCountry(country);
  };

  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>

      {isPhone && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CountryPicker
            {...{
              countryCode,
              withFilter: true,
              withFlag: true,
              withCountryNameButton: false,
              withCallingCode: true,
              onSelect,
            }}
          />
        </View>
      )}

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
