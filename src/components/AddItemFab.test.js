import React from 'react';
import { render, fireEvent, wait } from '../test-utils/custom-renderer';
import { AddItemFab } from './AddItemFab';

const navigation = {
  navigate: jest.fn(),
};

describe('AddItemFab', () => {
  it('Render an add list item fab', async () => {
    const { getByTestId } = render(
      <AddItemFab navigation={navigation} listId="mock-list-id" />,
    );
    const addItemFab = getByTestId('fab-base');
    expect(addItemFab).toBeTruthy();
    fireEvent.press(addItemFab);
    await wait(() =>
      expect(navigation.navigate).toHaveBeenCalledWith('AddListItem', {
        listId: 'mock-list-id',
      }),
    );
    await wait(() => expect(navigation.navigate).toHaveBeenCalledTimes(1));
  });
});
