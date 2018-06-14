import React, { Component } from 'react';
import { View } from 'react-native';
import { Form, Input, Item, Label } from 'native-base';
import { UpdateTitleButton } from './UpdateTitleButton';
import { DeleteListButton } from './DeleteListButton';
import { ListMembers } from './ListMembers';

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
    if (!list) return null;
    return (
      <View>
        <Form
          style={{
            paddingBottom: 40,
            paddingRight: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Item style={{ flexGrow: 1 }} stackedLabel>
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
            list={list}
            title={title}
          />
        </Form>
        <View style={{ paddingBottom: 40 }}>
          <ListMembers navigation={navigation} list={list} />
        </View>
      </View>
    );
  }
}
