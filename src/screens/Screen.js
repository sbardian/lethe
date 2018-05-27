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
  showHeader = true,
  headerButtonAction,
  headerIcon,
  headerTitle,
  screenStyles,
  children,
  fab,
}) => (
  <Container style={screenStyles}>
    {showHeader ? (
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
    ) : null}
    <Content contentContainerStyle={{ flex: 1 }}>{children}</Content>
  </Container>
);
