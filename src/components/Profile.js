/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Alert, Image, ImageBackground, StyleSheet, View } from 'react-native';
import { Button, Text } from 'native-base';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { ImagePicker, Permissions } from 'expo';

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
    // backgroundColor: '#AE24FD',
    backgroundColor: 'white',
  },
  profileImage: {
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
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      profileStatus: true,
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      this.setState({
        profileStatus: true,
      });
      Alert.alert(
        'Profile Image',
        `You have not granted permission to access your images, you will not be able to update your profile image.`,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => console.log('Ok Pressed'),
          },
        ],
        { cancelable: true },
      );
    } else {
      this.setState({
        profileStatus: false,
      });
    }
  }

  pickImage = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!pickerResult.cancelled) this.setState({ image: pickerResult.uri });
  };

  render() {
    let { image } = this.state;
    return (
      <Query query={GET_MY_INFO}>
        {({ loading, error, data: { getMyInfo } = [] }) => {
          if (loading) return <Text>Loading...</Text>;
          if (error) return <Text>Error {error.message}</Text>;

          const { id, username, email } = getMyInfo;
          return (
            <View style={styles.container}>
              <View style={styles.headerContainer}>
                <ImageBackground
                  source={require('../images/background.png')}
                  style={styles.backgroundImage}
                >
                  <View style={styles.profileImage}>
                    <Image
                      style={styles.userImage}
                      source={require('../images/defaultProfile.jpg')}
                    />
                    <Text style={styles.text}>{username}</Text>
                  </View>
                </ImageBackground>
              </View>
              <View>
                <Text>Email: {email}</Text>
                <Text>Profile Image: </Text>
                <Button
                  bordered
                  disabled={this.state.profileStatus}
                  onPress={this.pickImage}
                >
                  <Text>Select</Text>
                </Button>
                {this.state.image && (
                  <View
                    style={{
                      borderTopRightRadius: 3,
                      borderTopLeftRadius: 3,
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      source={{ uri: image }}
                      style={{ width: 250, height: 250 }}
                    />
                  </View>
                )}
              </View>
            </View>
          );
        }}
      </Query>
    );
  }
}
