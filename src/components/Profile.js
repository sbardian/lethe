/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
} from 'react-native';
import {
  Button,
  Body,
  Card,
  Thumbnail,
  CardItem,
  H3,
  Text,
  Icon,
  Form,
  Item,
  Label,
  Input,
} from 'native-base';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { oneLine } from 'common-tags';
import { ImagePicker, Permissions } from 'expo';
import { ReactNativeFile } from 'apollo-upload-client';
import { styles as s } from 'react-native-style-tachyons';
import defaultImage from '../images/defaultProfile.jpg';
import backgroundImage from '../images/background.png';
import { DeclineInvitationIcon } from './DeclineInvitationIcon';

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
  saveUserImage: {
    backgroundColor: 'transparent',
    borderColor: '#f0ad4e',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
    overflow: 'hidden',
  },
});

const GET_MY_INFO = gql`
  {
    getMyInfo {
      id
      username
      email
      profileImageUrl
      lists {
        title
        invitations {
          id
          title
          invitee
          inviter {
            id
            username
            profileImageUrl
            email
          }
        }
      }
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

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      fileToUpload: null,
      permissionStatus: true,
      editUsername: false,
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      this.setState({
        permissionStatus: true,
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
        permissionStatus: false,
      });
    }
  }

  onImageUploadSuccess = () => {
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
        type: `image/${ext}`,
      });
      this.setState({ image: pickerResult.uri, fileToUpload: file });
    }
  };

  enableUsernameEdit = () => {
    this.setState({
      editUsername: !this.state.editUsername,
    });
  };

  render() {
    let {
      image,
      defaultImage,
      editUsername,
      permissionStatus,
      fileToUpload,
    } = this.state;
    return (
      <Query query={GET_MY_INFO}>
        {({ subscribeToMore, loading, error, data: { getMyInfo } = [] }) => {
          if (loading) return <Text>Loading...</Text>;
          if (error) return <Text>Error {error.message}</Text>;

          const { id, lists, username, email, profileImageUrl } = getMyInfo;

          let myImage = profileImageUrl;

          const invitationsArray = [];

          lists.filter(list => {
            if (list.invitations.length > 0) {
              return list.invitations.forEach(invite => {
                const newInvitation = { ...invite, listTitle: list.title };
                invitationsArray.push(newInvitation);
              });
            }
          });

          return (
            <View style={styles.container}>
              <View style={styles.headerContainer}>
                <ImageBackground
                  source={backgroundImage}
                  style={styles.backgroundImage}
                >
                  <View style={styles.profileImage}>
                    <TouchableOpacity
                      disabled={permissionStatus}
                      onPress={this.pickImage}
                    >
                      {!image && (
                        <Image
                          style={styles.userImage}
                          source={
                            myImage
                              ? { uri: `https://${myImage}` }
                              : defaultImage
                          }
                        />
                      )}
                    </TouchableOpacity>
                    <Mutation
                      mutation={UPLOAD_PROFILE_IMAGE}
                      onCompleted={() => {
                        myImage = null;
                        this.onImageUploadSuccess();
                      }}
                      onError={error => console.log('Error!: ', error)}
                      optimisticResponse={{
                        __typename: 'Mutation',
                        profileImageUpload: {
                          __typename: 'User',
                          profileImageUrl: image,
                        },
                      }}
                    >
                      {profileImageUpload => (
                        <TouchableOpacity
                          disabled={permissionStatus}
                          onPress={() =>
                            profileImageUpload({
                              refetchQueries: [
                                {
                                  query: GET_MY_INFO,
                                },
                              ],
                              variables: {
                                file: fileToUpload,
                              },
                            })
                          }
                        >
                          {image && (
                            <View style={styles.profileImage}>
                              <Image
                                style={styles.saveUserImage}
                                source={{ uri: image }}
                              />
                              <Text>Click image to confirm and upload</Text>
                            </View>
                          )}
                        </TouchableOpacity>
                      )}
                    </Mutation>
                    {!editUsername && (
                      <TouchableOpacity onPress={this.enableUsernameEdit}>
                        <Text style={styles.text}>{username}</Text>
                      </TouchableOpacity>
                    )}
                    {editUsername && (
                      <View style={[s.flx_row, s.pa3, s.jcsb]}>
                        <Item style={[s.flx_i]} stackedLabel>
                          <Label style={[s.white]}>Username</Label>
                          <Input
                            style={[s.white]}
                            placeholder={username}
                            id="ListTitle"
                            onChangeText={value =>
                              console.log('new username: ', value)
                            }
                          />
                        </Item>
                        <Icon
                          style={[s.white, s.pt4]}
                          name="edit-2"
                          type="Feather"
                        />
                        <TouchableOpacity onPress={this.enableUsernameEdit}>
                          <Icon
                            style={[s.white, s.pt4]}
                            name="cancel"
                            type="MaterialIcons"
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </ImageBackground>
              </View>
              <View style={styles.contentContainer}>
                <Text>Email: {email}</Text>
              </View>
              <View>
                <FlatList
                  bordered
                  data={invitationsArray}
                  renderItem={({ item }) => (
                    <Card>
                      <CardItem header bordered>
                        <Thumbnail
                          circle
                          small
                          style={{ marginRight: 10 }}
                          source={
                            item.inviter.profileImageUrl
                              ? {
                                  uri: `https://${
                                    item.inviter.profileImageUrl
                                  }`,
                                }
                              : require('../images/defaultProfile.jpg')
                          }
                        />
                        <Text>{`Invitation for list: ${item.listTitle}`}</Text>
                      </CardItem>
                      <CardItem>
                        <Body>
                          <H3>{item.title}</H3>
                        </Body>
                      </CardItem>
                      <View
                        style={(s.flx_i, [s.flx_row, s.jcsa, s.aic, s.pa3])}
                      >
                        <DeclineInvitationIcon
                          buttonText="Delete"
                          invitationId={item.id}
                        />
                      </View>
                    </Card>
                  )}
                  keyExtractor={item => item.id}
                />
              </View>
            </View>
          );
        }}
      </Query>
    );
  }
}
