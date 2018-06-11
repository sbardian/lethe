import React, { Component } from 'react';
import { View } from 'react-native';
import { Form, Input, Item, Label, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { styles as s } from 'react-native-style-tachyons';
import { UpdateTitleButton } from './UpdateTitleButton';
import { DeleteListButton } from './DeleteListButton';

// const DELETE_LIST = gql`
//   mutation deleteList($listId: String!) {
//     deleteList(listId: $listId) {
//       id
//       title
//     }
//   }
// `;

// const deleteListMutation = ({ navigation, render }) => (
//   <Mutation
//     mutation={DELETE_LIST}
//     update={(cache, { data }) => {
//       const cacheData = cache.readQuery({ query: GET_MY_LISTS });
//       const newCacheData = cacheData.getMyInfo.lists.filter(
//         casheList => casheList.id !== data.deleteList.id,
//       );
//       cache.writeQuery({
//         query: GET_MY_LISTS,
//         data: {
//           getMyInfo: {
//             __typename: 'User',
//             lists: [...newCacheData],
//           },
//         },
//       });
//     }}
//     onCompleted={() => {
//       navigation.navigate('Lists');
//     }}
//   >
//     {(mutation, result) => render({ mutation, result })}
//   </Mutation>
// );

export class ListSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.list.title,
      titleNotChanged: true,
      deleteConfirmed: true,
    };
  }

  onTitleChange(value) {
    this.setState({
      title: value,
      titleNotChanged: false,
    });
  }

  onDeleteTitleChange(value) {
    if (this.props.list.title === value) {
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
      title: value,
      titleNotChanged: true,
    });
  }

  render() {
    const { list, navigation } = this.props;
    const { titleNotChanged, title, deleteConfirmed } = this.state;
    return (
      <View>
        <Form
          style={{
            paddingBottom: 40,
            paddingRight: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexGrow: 1,
          }}
        >
          <Item stackedLabel>
            <Label>Title</Label>
            <Input
              placeholder={list.title}
              id="ListTitle"
              onChangeText={value => this.onTitleChange(value)}
            />
          </Item>
          <UpdateTitleButton
            list={list}
            title={title}
            titleNotChanged={titleNotChanged}
            onTitleSave={() => this.handleTitleSave()}
          />
        </Form>
        <Form
          style={{
            paddingBottom: 40,
            paddingRight: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexGrow: 1,
          }}
        >
          <Item stackedLabel>
            <Label>Enter the list name to delete.</Label>
            <Input
              id="DeleteListTitle"
              onChangeText={value => this.onDeleteTitleChange(value)}
            />
          </Item>
          <DeleteListButton
            active={deleteConfirmed}
            navigation={navigation}
            list={list}
            title={title}
          />
        </Form>
      </View>
    );
  }
}
