import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const imgDefault =
  'https://avatars2.githubusercontent.com/u/54192694?s=460&u=a0ac6a9b16621a72fd3bfd6bba0c0081c2259d5b&v=4';

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    api.get('providers').then((res) => {
      setProviders(res.data);
    });
  }, []);

  const navigateProfile = useCallback(() => {
    // navigate('Profile');
    signOut();
  }, [signOut]);

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
          <UserAvatar source={{ uri: user?.avatar_url || imgDefault }} />
        </ProfileButton>
      </Header>

      <ProvidersList
        data={providers}
        keyExtractor={(provider) => provider?.id}
        renderItem={({ item }) => <UserName>{item?.name}</UserName>}
      />
    </Container>
  );
};

export default Dashboard;
