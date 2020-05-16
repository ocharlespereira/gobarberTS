import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Gobarber2020:token');
    const user = localStorage.getItem('@Gobarber2020:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  })

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password
    });

    const { token, user } = response.data;

    localStorage.setItem('@Gobarber2020:token', token);
    localStorage.setItem('@Gobarber2020:user', JSON.stringify(user));

    setData({ token, user });
  }, [])

  //Logout
  const signOut = useCallback(() => {
    const token = localStorage.removeItem('@Gobarber2020:token');
    const user = localStorage.removeItem('@Gobarber2020:user');

    setData({} as AuthState);
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must by used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
