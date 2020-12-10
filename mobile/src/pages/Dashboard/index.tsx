import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
} from './styles';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();

  const navigateProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user?.name || 'Charles Pereira'}</UserName>
        </HeaderTitle>

        <ProfileButton
          onPress={() => {
            navigateProfile;
          }}
        >
          <UserAvatar source={{ uri: user?.avatar_url }} />
        </ProfileButton>
      </Header>
    </Container>
  );
};

export default Dashboard;
