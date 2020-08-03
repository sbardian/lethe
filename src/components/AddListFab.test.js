import React from 'react';
import { render, fireEvent, waitFor } from '../test-utils/custom-renderer';
import { AddListFab } from './AddListFab';

const navigation = {
  navigate: jest.fn(),
};

describe('AddListFab', () => {
  it('Render an add list fab and click', async () => {
    const { getByTestId } = render(<AddListFab navigation={navigation} />);
    const addListFab = getByTestId('fab-base');
    expect(addListFab).toBeTruthy();
    fireEvent.press(addListFab);
    await waitFor(() =>
      expect(navigation.navigate).toHaveBeenCalledWith('AddList'),
    );
    await waitFor(() => expect(navigation.navigate).toHaveBeenCalledTimes(1));
  });
});
