import React from 'react';
import { render, fireEvent, wait } from '../test-utils/custom-renderer';
import { AddListForm } from './AddListForm';

const navigation = {
  navigate: jest.fn(),
};

describe('AddListForm', () => {
  it('Render add list form, create new list successfully', async () => {
    const { getByTestId } = render(<AddListForm navigation={navigation} />);
    // debug();
    const titleInput = getByTestId('list-title');
    const addListButton = getByTestId('add-list-button');
    expect(titleInput).toBeTruthy();
    expect(addListButton).toBeTruthy();
    fireEvent.changeText(titleInput, 'New List Title');
    fireEvent.press(addListButton);
    await wait(() => expect(navigation.navigate).toHaveBeenCalledTimes(1));
    await wait(() => expect(navigation.navigate).toHaveBeenCalledWith('Lists'));
  });
  it('Render add list form, create new list failure', async () => {
    const { getByTestId, getByText } = render(
      <AddListForm navigation={navigation} />,
    );
    const titleInput = getByTestId('list-title');
    const addListButton = getByTestId('add-list-button');
    expect(titleInput).toBeTruthy();
    expect(addListButton).toBeTruthy();
    fireEvent.press(addListButton);
    await wait(() => expect(navigation.navigate).toHaveBeenCalledTimes(0));
    await wait(() =>
      expect(
        getByText(
          'Error: GraphQL error: An error has occured. . . the sadness',
        ),
      ).toBeTruthy(),
    );
  });
});
