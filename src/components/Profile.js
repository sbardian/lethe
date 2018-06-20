/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Text } from 'native-base';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { oneLine } from 'common-tags';
import { ImagePicker, Permissions } from 'expo';
import { ReactNativeFile } from 'apollo-upload-client';

const GET_MY_INFO = gql`
  {
    getMyInfo {
      id
      username
      email
      profileImageUrl
    }
  }
`;

const UPLOAD_PROFILE_IMAGE = gql`
  mutation profileImageUpload($file: Upload!) {
    profileImageUpload(file: $file) {
      profileImageUrl
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
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
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
    overflow: 'hidden',
  },
});

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      fileToUpload: null,
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
        oneLine`You have not granted permission to access your images, 
        you will not be able to update your profile image.`,
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

  onImageUploadSuccess = () => {
    console.log('returning to null');
    this.setState({
      image: null,
    });
  };

  pickImage = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!pickerResult.cancelled) {
      const ext = pickerResult.uri.substr(
        pickerResult.uri.lastIndexOf('.') + 1,
      );
      const file = new ReactNativeFile({
        ...pickerResult,
        name: `profileImage.${ext}`,
      });
      this.setState({ image: pickerResult, fileToUpload: file });
    }
  };

  render() {
    let { image } = this.state;
    return (
      <Query query={GET_MY_INFO}>
        {({ loading, error, data: { getMyInfo } = [] }) => {
          if (loading) return <Text>Loading...</Text>;
          if (error) return <Text>Error {error.message}</Text>;

          const { id, username, email, profileImageUrl } = getMyInfo;
          return (
            <View style={styles.container}>
              <View style={styles.headerContainer}>
                <ImageBackground
                  source={require('../images/background.png')}
                  style={styles.backgroundImage}
                >
                  <View style={styles.profileImage}>
                    <TouchableOpacity
                      disabled={this.state.profileStatus}
                      onPress={this.pickImage}
                    >
                      <Image
                        style={styles.userImage}
                        source={
                          profileImageUrl
                            ? { uri: `https://${profileImageUrl}` }
                            : require('../images/defaultProfile.jpg')
                        }
                      />
                    </TouchableOpacity>
                    <Text style={styles.text}>{username}</Text>
                  </View>
                </ImageBackground>
              </View>
              <View style={styles.contentContainer}>
                <Text>Email: {email}</Text>
                {this.state.image && (
                  <View style={styles.contentContainer}>
                    <Image
                      source={{ uri: image.uri }}
                      style={{ width: 250, height: 250 }}
                    />
                    <Mutation
                      mutation={UPLOAD_PROFILE_IMAGE}
                      onCompleted={this.onImageUploadSuccess}
                      onError={error => console.log('Error!: ', error)}
                    >
                      {profileImageUpload => (
                        <Button
                          onPress={() =>
                            profileImageUpload({
                              refetchQueries: [
                                {
                                  query: GET_MY_INFO,
                                },
                              ],
                              variables: {
                                file: this.state.fileToUpload,
                              },
                            })
                          }
                        >
                          <Text>Upload!</Text>
                        </Button>
                      )}
                    </Mutation>
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
