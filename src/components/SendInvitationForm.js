import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import { Button, Form, Input, Item, Label, Text, Toast } from 'native-base';

const SEND_INVITATION = gql`
  mutation createInvitation(
    $listId: String!
    $invitee: String!
    $title: String!
  ) {
    createInvitation(listId: $listId, invitee: $invitee, title: $title) {
      id
      inviter {
        id
        username
        profileImageUrl
      }
      invitee {
        id
        username
        profileImageUrl
        email
      }
      list
      title
    }
  }
`;

const GET_LIST = gql`
  query getLists($id_is: String!) {
    getLists(id_is: $id_is) {
      id
      title
    }
  }
`;

export const SendInvitationForm = ({ listId, navigation }) => {
  const [title, setTitle] = React.useState('');
  const [invitee, setInvitee] = React.useState('');

  const onTitleChange = (value) => {
    setTitle(value);
  };

  const onInviteeChange = (value) => {
    setInvitee(value);
  };

  const {
    loading,
    error,
    data: { getLists = [] },
  } = useQuery(GET_LIST, {
    variables: { id_is: listId },
  });

  const [createInvitation, { loading: mutationLoading }] = useMutation(
    SEND_INVITATION,
    {
      variables: {
        listId,
        title,
        invitee,
      },
      onCompleted: () => {
        Toast.show({
          text: `Invitation has been successfully sent`,
          buttonText: 'Ok',
          type: 'success',
          position: 'bottom',
          duration: 3000,
          onClose: () => navigation.navigate('ListSettings', { listId }),
        });
      },
      onError: (mutationError) => {
        Toast.show({
          text: `Failed to send invitation: ${mutationError.message}`,
          buttonText: 'Ok',
          type: 'danger',
          position: 'bottom',
          duration: 3000,
          onClose: () => navigation.navigate('Items', { listId }),
        });
      },
    },
  );

  if (loading) {
    return <Text>Loading . . . </Text>;
  }
  if (error) {
    return <Text>Error: ${error.message}</Text>;
  }

  const [{ title: defaultTitle }] = getLists;

  return (
    <View>
      <Form style={{ paddingBottom: 40, paddingRight: 20 }}>
        <Item stackedLabel>
          <Label>Invitation Title</Label>
          <Input
            placeholder={`Join my list ${defaultTitle}!`}
            id="InvitationTitle"
            onChangeText={(value) => onTitleChange(value)}
          />
        </Item>
        <Item stackedLabel>
          <Label>Invitee</Label>
          <Input
            placeholder="Username or Email"
            id="InvitationInvitee"
            autoCapitalize="none"
            onChangeText={(value) => onInviteeChange(value)}
          />
        </Item>
      </Form>
      <View>
        <Button
          block
          light
          style={{ marginLeft: 20, marginRight: 20 }}
          disabled={mutationLoading}
          onPress={() => createInvitation()}
        >
          <Text>OK</Text>
        </Button>
        <Button
          block
          light
          style={{ margin: 20 }}
          onPress={() => navigation.goBack()}
        >
          <Text>Cancel</Text>
        </Button>
      </View>
    </View>
  );
};

SendInvitationForm.displayName = 'SendInvitationForm';

SendInvitationForm.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  listId: PropTypes.string.isRequired,
};
