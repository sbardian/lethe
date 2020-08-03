import React from 'react';
import { render, fireEvent, waitFor } from '../test-utils/custom-renderer';
import { LoginForm } from './LoginForm';

const onSetToken = jest.fn();

describe('LoginForm', () => {
  it('Login success with token returned', async () => {
    const { getByTestId } = render(<LoginForm onSetToken={onSetToken} />);
    const usernameInput = getByTestId('username');
    const passwordInput = getByTestId('password');
    const loginButton = getByTestId('login');
    fireEvent.changeText(usernameInput, 'bob');
    fireEvent.changeText(passwordInput, 'bob');
    fireEvent.press(loginButton);
    await waitFor(() => expect(onSetToken).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(onSetToken).toHaveBeenCalledWith('this-is-a-mock-token'),
    );
  });
  it('Login failure with error returned', async () => {
    const { getByTestId, queryByText, debug } = render(
      <LoginForm onSetToken={onSetToken} />,
    );
    const usernameInput = getByTestId('username');
    const passwordInput = getByTestId('password');
    const loginButton = getByTestId('login');
    fireEvent.changeText(usernameInput, 'bob');
    fireEvent.changeText(passwordInput, 'wrong-pass');
    fireEvent.press(loginButton);
    await waitFor(() => expect(getByTestId('login-error')).toBeTruthy());
    await waitFor(() =>
      expect(
        queryByText('GraphQL error: An error has occured. . . the sadness'),
      ).toBeTruthy(),
    );
  });
});
