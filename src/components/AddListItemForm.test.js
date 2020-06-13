import React from 'react';
import { render, fireEvent, wait } from '../test-utils/custom-renderer';
import { AddListItemForm } from './AddListItemForm';

const navigation = {
  goBack: jest.fn(),
};

describe('AddListItemForm', () => {
  it('Render add list form, create new list successfully', async () => {
    const { getByTestId } = render(
      <AddListItemForm navigation={navigation} listId="mock-list-id" />,
    );
    await wait(() => expect(navigation.goBack).toHaveBeenCalledTimes(0));
    const titleInput = getByTestId('item-title');
    const addItemButton = getByTestId('add-list-item-button');
    expect(titleInput).toBeTruthy();
    expect(addItemButton).toBeTruthy();
    fireEvent.changeText(titleInput, 'New Item Title');
    fireEvent.press(addItemButton);
    await wait(() => expect(navigation.goBack).toHaveBeenCalledTimes(1));
  });
  it('Render add list form, create new list failure', async () => {
    const { getByTestId, getByText } = render(
      <AddListItemForm navigation={navigation} listId="mock-list-id" />,
    );
    await wait(() => expect(navigation.goBack).toHaveBeenCalledTimes(0));
    const titleInput = getByTestId('item-title');
    const addItemButton = getByTestId('add-list-item-button');
    expect(titleInput).toBeTruthy();
    expect(addItemButton).toBeTruthy();
    fireEvent.press(addItemButton);
    await wait(() =>
      expect(
        getByText(
          'Error: GraphQL error: An error has occured. . . the sadness',
        ),
      ).toBeTruthy(),
    );
    expect(navigation.goBack).toHaveBeenCalledTimes(1);
  });
});
