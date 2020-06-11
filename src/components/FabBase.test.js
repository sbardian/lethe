import React from 'react';
import { render } from '../test-utils/custom-renderer';
import { FabBase } from './FabBase';

const navigation = {
  navigate: jest.fn(),
};

describe('FabBase', () => {
  it('Render a base fab using add icon', async () => {
    const { getByTestId } = render(
      <FabBase
        backgroundColor="#8CD19D"
        position="bottomRight"
        onPress={() => navigation.navigate('AddList')}
        iconName="add"
        iconType="Ionicons"
      />,
    );
    const fabBase = getByTestId('fab-base');
    expect(fabBase).toBeTruthy();
  });
});
