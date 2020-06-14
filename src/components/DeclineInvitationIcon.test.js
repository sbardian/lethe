import React from 'react';
import { render, fireEvent } from '../test-utils/custom-renderer';
import { DeclineInvitationIcon } from './DeclineInvitationIcon';

describe('DeclineInvitationIcon', () => {
  it('Render decline invitation and click, success', async () => {
    const { getByTestId } = render(
      <DeclineInvitationIcon
        buttonProps={{
          iconLeft: true,
          light: true,
          info: true,
        }}
        iconColor="#666"
        invitationId="mock-invitation-id"
        buttonText="Decline"
      />,
    );
    const declineButton = getByTestId('decline-button');
    expect(declineButton).toBeTruthy();
    fireEvent.press(declineButton);
    // TODO: Toasts are not rendered within this component, maybe able to test from
    // component that wraps toasts?
    // await wait(() => expect(queryByText('List joined!')).toBeTruthy());
    // await wait(() => expect(queryByText('An error has occured')).toBeNull());
  });
  it('Render decline invitation and click, failure', async () => {
    const { getByTestId } = render(
      <DeclineInvitationIcon
        buttonProps={{
          iconLeft: true,
          light: true,
          info: true,
        }}
        iconColor="#666"
        invitationId="mock-invitation-failure-id"
        buttonText="Decline"
      />,
    );
    const declineButton = getByTestId('decline-button');
    expect(declineButton).toBeTruthy();
    fireEvent.press(declineButton);
    // TODO: Toasts are not rendered within this component, maybe able to test from
    // component that wraps toasts?
    // await wait(() => expect(queryByText('List joined!')).toBeTruthy());
    // await wait(() => expect(queryByText('An error has occured')).toBeNull());
  });
});
