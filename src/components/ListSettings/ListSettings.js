import React, { Component } from 'react';
import { View } from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Form, Input, Item, Label, Text } from 'native-base';
import { UpdateTitleButton } from './UpdateTitleButton';
import { DeleteListButton } from './DeleteListButton';
import { ListMembers } from './ListMembers';

const GET_LIST = gql`
  query getLists($id_is: String!) {
    getLists(id_is: $id_is) {
      id
      title
    }
  }
`;

export class ListSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTitle: '',
      orgTitle: this.props.title,
      titleNotChanged: true,
      deleteConfirmed: true,
    };
  }

  onTitleChange(value) {
    this.setState({
      newTitle: value,
      titleNotChanged: false,
    });
  }

  onDeleteTitleChange(value) {
    if (this.state.orgTitle === value) {
      this.setState({
        deleteConfirmed: false,
      });
    } else {
      this.setState({
        deleteConfirmed: true,
      });
    }
  }

  handleTitleSave(value) {
    this.setState({
      newTitle: value,
      titleNotChanged: true,
    });
  }

  render() {
    const { listId, navigation } = this.props;
    const { titleNotChanged, deleteConfirmed, newTitle, orgTitle } = this.state;
    return (
      <Query query={GET_LIST} variables={{ id_is: listId }}>
        {({ loading, error, data: { getLists = [] } }) => {
          if (loading) {
            return <Text>Loading . . . </Text>;
          }
          if (error) {
            return <Text>Error: ${error.message}</Text>;
          }
          const { id } = getLists[0];
          return (
            <View>
              <Form
                style={{
                  paddingBottom: 40,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Item style={{ flexGrow: 1 }} stackedLabel>
                  <Label>Title</Label>
                  <Input
                    placeholder={orgTitle}
                    id="ListTitle"
                    onChangeText={value => this.onTitleChange(value)}
                  />
                </Item>
                <UpdateTitleButton
                  listId={id}
                  newTitle={newTitle}
                  titleNotChanged={titleNotChanged}
                  onTitleSave={() => this.handleTitleSave()}
                />
              </Form>
              <Form
                style={{
                  paddingBottom: 40,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}
              >
                <Item style={{ flexGrow: 1 }} stackedLabel>
                  <Label>Enter list title to confirm delele:</Label>
                  <Input
                    id="DeleteListTitle"
                    onChangeText={value => this.onDeleteTitleChange(value)}
                  />
                </Item>
                <DeleteListButton
                  active={deleteConfirmed}
                  navigation={navigation}
                  listId={id}
                  title={orgTitle}
                />
              </Form>
              <View style={{ paddingBottom: 40 }}>
                {<ListMembers navigation={navigation} listId={id} />}
              </View>
            </View>
          );
        }}
      </Query>
    );
  }
}
