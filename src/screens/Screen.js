import React from 'react';
import { View } from 'react-native';
import { Container, Content } from 'native-base';

export const Screen = ({ screenStyles, children, fab }) => (
  <Container style={screenStyles}>
    <Content>{children}</Content>
    {fab}
  </Container>
);
