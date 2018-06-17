import React, { Component } from 'react';
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
      inviter
      invitee
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
    return (
      <Query query={GET_LIST} variables={{ id_is: listId }}>
        {({ loading, error, data: { getLists = [] } }) => {
          const { title } = getLists[0];
          return (
            <View>
              <Form style={{ paddingBottom: 40, paddingRight: 20 }}>
                <Item stackedLabel>
                  <Label>Invitation Title</Label>
                  <Input
                    placeholder={`Join my list ${title}!`}
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
                onCompleted={data => {
                  console.log('data = ', data);
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
                onError={error => {
                  Toast.show({
                    text: `Failed to send invitation: ${error.message}`,
                    buttonText: 'Ok',
                    type: 'danger',
                    position: 'bottom',
                    duration: 3000,
                    onClose: () => navigation.navigate('Items', { listId }),
                  });
                }}
              >
                {(createInvitation, { loading }) => (
                  <View>
                    <Button
                      full
                      light
                      disabled={loading}
                      onPress={async () =>
                        createInvitation({
                          variables: {
                            listId,
                            title: this.state.title,
                            invitee: this.state.invitee,
                          },
                        })
                      }
                    >
                      <Text>OK</Text>
                    </Button>
                    <Button full light onPress={() => navigation.goBack()}>
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
