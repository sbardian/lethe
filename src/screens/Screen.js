import React from 'react';
import { View } from 'react-native';
import { Container, Content } from 'native-base';

export const Screen = ({ screenStyles, children, fab }) => (
  <Container style={screenStyles}>
    <Content contentContainerStyle={{ flex: 1 }}>{children}</Content>
    {fab}
  </Container>
);
