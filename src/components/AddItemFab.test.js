import React from 'react';
import { render, fireEvent, waitFor } from '../test-utils/custom-renderer';
import { AddItemFab } from './AddItemFab';

const navigation = {
  navigate: jest.fn(),
};

describe('AddItemFab', () => {
  it('Render an add list item fab and click', async () => {
    const { getByTestId } = render(
      <AddItemFab navigation={navigation} listId="mock-list-id" />,
    );
    const addItemFab = getByTestId('fab-base');
    expect(addItemFab).toBeTruthy();
    fireEvent.press(addItemFab);
    await waitFor(() =>
      expect(navigation.navigate).toHaveBeenCalledWith('AddListItem', {
        listId: 'mock-list-id',
      }),
    );
    await waitFor(() => expect(navigation.navigate).toHaveBeenCalledTimes(1));
  });
});
