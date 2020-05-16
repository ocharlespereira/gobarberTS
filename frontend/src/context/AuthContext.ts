import { createContext } from 'react';

interface AuthContext {
  name: string;
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

export default AuthContext;
