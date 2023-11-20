import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

//icons

import {
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Line,
  WelcomeContainer,
  WelcomeImage,
  Avatar,
} from './../components/styles';

const Welcome = ({ navigation }) => {
  return (
    <>
      <StatusBar style="dark"></StatusBar>
      <InnerContainer>
        <WelcomeImage resizeMode="cover" source={require('./../assets/img/logo.png')}></WelcomeImage>
        <WelcomeContainer>
          <PageTitle welcome={true}>Welcome Buddy!</PageTitle>
          <SubTitle welcome={true}>Sandu Dragos</SubTitle>
          <SubTitle welcome={true}>dragos.sandu@mta.ro</SubTitle>

          <Avatar resizeMode="cover" source={require('./../assets/img/profileUser.png')}></Avatar>

          <StyledFormArea>
            <Line />
            <StyledButton
              onPress={() => {
                navigation.navigate('Login');
              }}
            >
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;
