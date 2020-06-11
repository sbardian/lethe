import React from 'react';
import { render, fireEvent, act, wait } from '../test-utils/custom-renderer';
import { LoginForm } from './LoginForm';

const onSetToken = jest.fn();

describe('LoginForm', () => {
  it('Login success with token returned', async () => {
    const { getByTestId } = render(<LoginForm onSetToken={onSetToken} />);
    const usernameInput = getByTestId('username');
    const passwordInput = getByTestId('password');
    const loginButton = getByTestId('login');
    act(() => {
      fireEvent.changeText(usernameInput, 'bob');
      fireEvent.changeText(passwordInput, 'bob');
    });
    fireEvent.press(loginButton);
    await wait(() => expect(onSetToken).toHaveBeenCalledTimes(1));
    await wait(() =>
      expect(onSetToken).toHaveBeenCalledWith('this-is-a-mock-token'),
    );
  });
  it('Login failure with error returned', () => {
    const { getByTestId, queryByText } = render(
      <LoginForm onSetToken={onSetToken} />,
    );
    const usernameInput = getByTestId('username');
    const passwordInput = getByTestId('password');
    const loginButton = getByTestId('login');
    act(() => {
      fireEvent.changeText(usernameInput, 'bob');
      fireEvent.changeText(passwordInput, 'wrong-pass');
    });
    fireEvent.press(loginButton);
    wait(() => expect(getByTestId('login-error')).toBeTruthy());
    wait(() => expect(queryByText('the sadness').toBeTruthy()));
  });
});
