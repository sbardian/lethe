import React from 'react';
import {
  Container,
  Header,
  Left,
  Button,
  Body,
  Title,
  Right,
  Content,
} from 'native-base';

export const Screen = ({ screenStyles, children, fab }) => (
  <Container style={screenStyles}>
    <Content contentContainerStyle={{ flex: 1 }}>{children}</Content>
  </Container>
);
