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

export const Screen = ({
  headerButtonAction,
  headerIcon,
  headerTitle,
  children,
  fab,
}) => (
  <Container>
    <Header>
      <Left>
        <Button transparent onPress={headerButtonAction}>
          {headerIcon}
        </Button>
      </Left>
      <Body>
        <Title>{headerTitle}</Title>
      </Body>
      <Right />
    </Header>
    <Content padder>{children}</Content>
  </Container>
);
