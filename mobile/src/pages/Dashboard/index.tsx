import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';
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
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const defaults = [
  {
    id: 1,
    name: 'Charles Pereira',
  },
];

const imgDefault =
  'https://avatars2.githubusercontent.com/u/54192694?s=460&u=a0ac6a9b16621a72fd3bfd6bba0c0081c2259d5b&v=4';

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([defaults[0]]);

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
        renderItem={({ item: provider }) => (
          <>
            <ProviderContainer onPress={() => {}}>
              <ProviderAvatar
                source={{ uri: provider?.avatar_url || imgDefault }}
              />

              <ProviderInfo>
                <ProviderName>{provider?.name}</ProviderName>

                <ProviderMeta>
                  <Icon name="calendar" size={14} color="#ff9000" />
                  <ProviderMetaText>Segunda à sexta</ProviderMetaText>
                </ProviderMeta>

                <ProviderMeta>
                  <Icon name="clock" size={14} color="#ff9000" />
                  <ProviderMetaText>08h às 18h</ProviderMetaText>
                </ProviderMeta>
              </ProviderInfo>
            </ProviderContainer>
            <ProviderContainer onPress={() => {}}>
              <ProviderAvatar
                source={{ uri: provider?.avatar_url || imgDefault }}
              />

              <ProviderInfo>
                <ProviderName>{provider?.name}</ProviderName>

                <ProviderMeta>
                  <Icon name="calendar" size={14} color="#ff9000" />
                  <ProviderMetaText>Segunda à sexta</ProviderMetaText>
                </ProviderMeta>

                <ProviderMeta>
                  <Icon name="clock" size={14} color="#ff9000" />
                  <ProviderMetaText>08h às 18h</ProviderMetaText>
                </ProviderMeta>
              </ProviderInfo>
            </ProviderContainer>
          </>
        )}
      />
    </Container>
  );
};

export default Dashboard;
