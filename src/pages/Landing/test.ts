import { Platform } from 'react-native';
import styled from 'styled-components/native';

import logo from '../../assets/logo512.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  padding: 40px;
  background-color: #8257e5;
  justify-content: center
`;

export const TextPrimary = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  line-height: 30;
  margin-top: 80;
`;

// export const LogoImage = styled.Image.attrs({
//   source: logo,
// })`
//   height: 40px;
//   width: 120px;
// `;

// export const LeftButton = styled(Button)`
//   margin-top: 5px;
//   background-color: #9871f5;
// `;

// export const ContainerButton = styled.View`
//   height: 150px;
//   width: '48%';
//   background-color: #333;
//   border-radius: 8px;
//   padding: 24px;
//   justify-content: space-between;
// `;





----------

import React from 'react';
import { View, Text, Image } from 'react-native';

import landingImg from '../../assets/images/landing.png';

import {
  Container,
  TextPrimary,
  LeftButton,
  ContainerButton,
} from './styles';



export default function Main() {
  return (
    <>
      <Container >
      {/* <Image source={landingImg} />
<TextPrimary >
  Seja bem-vindo, {'\n'}
  <Text>
    O que deseja fazer?
  </Text>
</TextPrimary>
<ContainerButton>
  <LeftButton>
    Teste
  </LeftButton>
</ContainerButton> */}
Olá
      </Container>

    </>
  );
}

