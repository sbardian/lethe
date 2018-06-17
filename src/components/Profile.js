/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  Icon,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { H1, Text } from 'native-base';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { styles as s } from 'react-native-style-tachyons';

const GET_MY_INFO = gql`
  {
    getMyInfo {
      id
      username
      email
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 300,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#AE24FD',
  },
  loginForm: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  userImage: {
    backgroundColor: '#666',
    borderColor: 'white',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
});

export class Profile extends Component {
  render() {
    return (
      <Query query={GET_MY_INFO}>
        {({ loading, error, data: { getMyInfo } = [] }) => {
          if (loading) return <Text>Loading...</Text>;
          if (error) return <Text>Error {error.message}</Text>;

          const { id, username, email } = getMyInfo;
          return (
            <View style={styles.container}>
              <View style={styles.headerContainer}>
                <View style={styles.backgroundImage}>
                  <View style={styles.loginForm}>
                    <Image
                      style={styles.userImage}
                      source={require('../images/defaultProfile.jpg')}
                    />
                    <Text style={styles.text}>{username}</Text>
                  </View>
                </View>
              </View>
              <View>
                <Text>Email: {email}</Text>
                <Text>Profile Image: </Text>
              </View>
            </View>
          );
        }}
      </Query>
    );
  }
}
