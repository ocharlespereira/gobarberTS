import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface RouteParams {
  providerId: string;
}

const imgDefault =
  'https://avatars2.githubusercontent.com/u/54192694?s=460&u=a0ac6a9b16621a72fd3bfd6bba0c0081c2259d5b&v=4';

const CreateAppointment: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>(defaults);

  const { user } = useAuth();
  const route = useRoute();
  const { goBack } = useNavigation();

  const { providerId } = route.params as RouteParams;

  useEffect(() => {
    api.get('providers').then((res) => {
      setProviders([res.data]);
    });
  }, []);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={20} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleiros</HeaderTitle>

        <UserAvatar source={{ uri: user?.avatar_url || imgDefault }} />
      </Header>

      <ProvidersListContainer
        data={providers}
        keyExtrator={(provider) => provider?.id}
        renderItem={({ item: provider }) => (
          <HeaderTitle>{provider?.name || 'Charles Pereira'}</HeaderTitle>
        )}
      />
    </Container>
  );
};

export default CreateAppointment;
