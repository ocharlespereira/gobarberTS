import React from 'react';
import { View, Button } from 'react-native';

import { useAuth } from '../../hooks/auth';

import { Container, Header, HeaderTitle, UserName } from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>Charles Pereira</UserName>
        </HeaderTitle>
      </Header>
    </Container>
  );
};

export default Dashboard;
