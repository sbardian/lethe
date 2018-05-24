/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Image, StatusBar } from 'react-native';
import { Text, Container, List, ListItem, Content } from 'native-base';

const routes = ['Home', 'Lists', 'Invitations'];
export class SideBar extends Component {
  render() {
    return (
      <Container>
        <StatusBar />
        <Content>
          <Image
            source={{
              uri:
                'https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/drawer-cover.png',
            }}
            style={{
              height: 120,
              width: '100%',
              alignSelf: 'stretch',
              position: 'absolute',
            }}
          />
          <Image
            square
            style={{
              height: 80,
              width: 70,
              position: 'absolute',
              alignSelf: 'center',
              top: 20,
            }}
            source={{
              uri:
                'https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/logo.png',
            }}
          />
          <List
            dataArray={routes}
            contentContainerStyle={{ marginTop: 120 }}
            renderRow={data => (
              <ListItem
                button
                onPress={() => this.props.navigation.navigate(data)}
              >
                <Text>{data}</Text>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}
