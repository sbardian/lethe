import React from 'react';
import { render } from '../test-utils/custom-renderer';
import { AddListFab } from './AddListFab';

const navigation = {
  navigate: jest.fn(),
};

describe('AddListFab', () => {
  it('Render an add list fab', async () => {
    const { getByTestId } = render(<AddListFab navigation={navigation} />);
    const fabBase = getByTestId('fab-base');
    expect(fabBase).toBeTruthy();
  });
});
