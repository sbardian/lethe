import React from 'react';
import { render, fireEvent, wait, act } from '../test-utils/custom-renderer';
import { AcceptInvitationIcon } from './AcceptInvitationIcon';

describe('AcceptInvitationIcon', () => {
  it('Render accept invitation icon and click, accept success', async () => {
    const { getByTestId } = render(
      <AcceptInvitationIcon invitationId="mock-invitation-id" />,
    );
    const acceptButton = getByTestId('accept-invitation-button');
    expect(acceptButton).toBeTruthy();
    fireEvent.press(acceptButton);
    // TODO: Toasts are not rendered within this component, maybe able to test from
    // component that wraps toasts?
    // await wait(() => expect(queryByText('List joined!')).toBeTruthy());
    // await wait(() => expect(queryByText('An error has occured')).toBeNull());
  });
  it('Render accept invitation icon and click, accept failure', async () => {
    const { getByTestId } = render(
      <AcceptInvitationIcon invitationId="mock-invalid-invitation-id" />,
    );
    const acceptButton = getByTestId('accept-invitation-button');
    expect(acceptButton).toBeTruthy();
    fireEvent.press(acceptButton);
    // TODO: Toasts are not rendered within this component, maybe able to test from
    // component that wraps toasts?
    // await wait(() => expect(queryByText('List joined!')).toBeNull());
    // await wait(() => expect(queryByText('An error has occured')).toBeTruthy());
  });
});
