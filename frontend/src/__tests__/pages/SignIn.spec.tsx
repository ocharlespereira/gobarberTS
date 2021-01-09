import React from 'react';
import { render } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

jest.mock('react-router-dom', () => {
  return {
    useHistory: jest.fn(), // função vazia que não faz nada e serve para saber se foi chamada ou não
    Link: ({ children }: { children: React.ReactNode }) => children, // Reactnode - qualquer conteudo que uma propriedade pode ter
  };
});

describe('SignIn Page', () => {
  it('should be able to sign in', () => {
    const { debug } = render(<SignIn />);

    debug();
  });
});
