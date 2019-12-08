/* eslint-disable react/prefer-stateless-function */
/* eslint-disable global-require */
import React from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text, Icon, Item, Label, Input } from 'native-base';
import gql from 'graphql-tag';
import { oneLine } from 'common-tags';
import { useMutation, useQuery } from '@apollo/react-hooks';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { ReactNativeFile } from 'apollo-upload-client';
import { styles as s } from 'react-native-style-tachyons';
import backgroundImage from '../images/background.png';
import defaultProfileImage from '../images/defaultProfile.jpg';

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

export const Profile = () => {
  // const [image, setImage] = React.useState(null);
  const [fileToUpload, setFileToUpload] = React.useState(null);
  const [noPermissionsGranted, setNoPermissionsGranted] = React.useState(false);
  const [editUsername, setEditUsername] = React.useState(false);

  const askForPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      setNoPermissionsGranted(true);
      Alert.alert(
        'Profile Image',
        oneLine`You have not granted permission to access your images,
        you will not be able to update your profile image.`,
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {},
          },
        ],
        { cancelable: true },
      );
    } else {
      setNoPermissionsGranted(false);
    }
  };

  React.useEffect(() => {
    askForPermissions();
  }, []);

  const pickImage = async () => {
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
      setFileToUpload(file);
    }
  };

  const enableUsernameEdit = () => {
    setEditUsername(!editUsername);
  };

  const { loading: queryLoading, error: queryError, data } = useQuery(
    GET_MY_INFO,
  );

  const [profileImageUpload] = useMutation(UPLOAD_PROFILE_IMAGE, {
    variables: {
      file: fileToUpload,
    },
    onCompleted: () => {
      setFileToUpload(null);
    },
    optimisticResponse: {
      __typename: 'Mutation',
      profileImageUpload: {
        __typename: 'User',
        profileImageUrl: fileToUpload,
      },
    },
  });

  if (queryLoading) {
    return <Text>Loading . . . </Text>;
  }
  if (queryError) {
    return <Text>Error: ${queryError.message}</Text>;
  }

  const {
    getMyInfo: { username, email, profileImageUrl },
  } = data;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ImageBackground
          source={backgroundImage}
          style={styles.backgroundImage}
        >
          <View style={styles.profileImage}>
            <TouchableOpacity
              disabled={noPermissionsGranted}
              onPress={pickImage}
            >
              {!fileToUpload && (
                <Image
                  style={styles.userImage}
                  source={
                    profileImageUrl
                      ? { uri: `https://${profileImageUrl}` }
                      : defaultProfileImage
                  }
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              disabled={noPermissionsGranted}
              onPress={() => {
                profileImageUpload({
                  refetchQueries: [
                    {
                      query: GET_MY_INFO,
                    },
                  ],
                });
              }}
            >
              {fileToUpload && (
                <View style={styles.profileImage}>
                  <Image
                    style={styles.saveUserImage}
                    source={{ uri: fileToUpload.uri }}
                  />
                  <Text>Click image to confirm and upload</Text>
                </View>
              )}
            </TouchableOpacity>
            {!editUsername && (
              <TouchableOpacity onPress={enableUsernameEdit}>
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
                    onChangeText={() => {}}
                  />
                </Item>
                <Icon style={[s.white, s.pt4]} name="edit-2" type="Feather" />
                <TouchableOpacity onPress={enableUsernameEdit}>
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
    </View>
  );
};

Profile.displayName = 'Profile';
