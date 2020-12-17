import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { useAuth } from '../hooks/auth';
import AuthRoutes from './auth.routes';

import AppRoutes from './app.routes';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  // TODO: voltar esta linha 21 para ativar authenticação
  // return user ? <AppRoutes /> : <AuthRoutes />;
  return <AppRoutes />;
};

export default Routes;
