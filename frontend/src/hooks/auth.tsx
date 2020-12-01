import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}
interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Gobarber2020:token');
    const user = localStorage.getItem('@Gobarber2020:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) }; // parse -> transforma em objeto
    }

    return {} as AuthState; // força typagem, hack
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@Gobarber2020:token', token);
    localStorage.setItem('@Gobarber2020:user', JSON.stringify(user)); // convert em string

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  // Logout
  const signOut = useCallback(() => {
    const token = localStorage.removeItem('@Gobarber2020:token');
    const user = localStorage.removeItem('@Gobarber2020:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must by used within an AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
