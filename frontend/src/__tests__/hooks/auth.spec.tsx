import { renderHook } from '@testing-library/react-hooks';
import { useAuth, AuthProvider } from '../../hooks/auth';

describe('Auth hook', () => {
  it('should be able to sign in', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'johndoe@exemple.com.br',
      password: '123456',
    });

    expect(result.current.user.email).toEqual('johndoe@exemple.com.br');
  });
});
