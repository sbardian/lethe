import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
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

export class SendInvitationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      invitee: '',
    };
  }

  onTitleChange(value) {
    this.setState({
      title: value,
    });
  }

  onInviteeChange(value) {
    this.setState({
      invitee: value,
    });
  }

  render() {
    const { listId, navigation } = this.props;
    const { invitee, title } = this.state;

    return (
      <Query query={GET_LIST} variables={{ id_is: listId }}>
        {({ loading, error, data: { getLists = [] } }) => {
          if (loading) {
            return <Text>Loading . . . </Text>;
          }
          if (error) {
            return <Text>Error: ${error.message}</Text>;
          }
          const { title: defaultTitle } = getLists[0];

          return (
            <View>
              <Form style={{ paddingBottom: 40, paddingRight: 20 }}>
                <Item stackedLabel>
                  <Label>Invitation Title</Label>
                  <Input
                    placeholder={`Join my list ${defaultTitle}!`}
                    id="InvitationTitle"
                    onChangeText={value => this.onTitleChange(value)}
                  />
                </Item>
                <Item stackedLabel>
                  <Label>Invitee</Label>
                  <Input
                    placeholder="Username or Email"
                    id="InvitationInvitee"
                    autoCapitalize="none"
                    onChangeText={value => this.onInviteeChange(value)}
                  />
                </Item>
              </Form>
              <Mutation
                mutation={SEND_INVITATION}
                onCompleted={() => {
                  Toast.show({
                    text: `Invitation has been successfully sent`,
                    buttonText: 'Ok',
                    type: 'success',
                    position: 'bottom',
                    duration: 3000,
                    onClose: () =>
                      navigation.navigate('ListSettings', { listId }),
                  });
                }}
                onError={mutationError => {
                  Toast.show({
                    text: `Failed to send invitation: ${mutationError.message}`,
                    buttonText: 'Ok',
                    type: 'danger',
                    position: 'bottom',
                    duration: 3000,
                    onClose: () => navigation.navigate('Items', { listId }),
                  });
                }}
              >
                {(createInvitation, { mutationLoading }) => (
                  <View>
                    <Button
                      block
                      light
                      style={{ marginLeft: 20, marginRight: 20 }}
                      disabled={mutationLoading}
                      onPress={async () =>
                        createInvitation({
                          variables: {
                            listId,
                            title,
                            invitee,
                          },
                        })
                      }
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
                )}
              </Mutation>
            </View>
          );
        }}
      </Query>
    );
  }
}
SendInvitationForm.displayName = 'SendInvitationForm';

SendInvitationForm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  listId: PropTypes.string.isRequired,
};
