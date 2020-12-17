import React from 'react';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
} from './styles';

interface RouteParams {
  providerId: string;
}

const imgDefault =
  'https://avatars2.githubusercontent.com/u/54192694?s=460&u=a0ac6a9b16621a72fd3bfd6bba0c0081c2259d5b&v=4';

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();
  const { providerId } = route.params as RouteParams;

  console.log('routeParams', providerId);

  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}}>
          <Icon name="chevron-left" size={20} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleiros</HeaderTitle>

        <UserAvatar source={{ uri: user?.avatar_url || imgDefault }} />
      </Header>
    </Container>
  );
};

export default CreateAppointment;
