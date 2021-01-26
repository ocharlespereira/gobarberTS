import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import SignIn from 'src/pages/SignIn';

describe('SignIn page', () => {
  it('should contains email/password input', () => {
    const { getByPlaceholderText } = render(<SignIn />);

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
    expect(getByPlaceholderText('Senha')).toBeTruthy();
  });
});
