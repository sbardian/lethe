import React from 'react';
import { render, fireEvent, wait } from '../test-utils/custom-renderer';
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
    await wait(() =>
      expect(navigation.navigate).toHaveBeenCalledWith('AddList'),
    );
    await wait(() => expect(navigation.navigate).toHaveBeenCalledTimes(1));
  });
});
