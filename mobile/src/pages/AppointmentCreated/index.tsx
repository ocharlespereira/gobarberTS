import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from './styles';

const AppointmentCreated: React.FC = () => {
  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />

      <Title>Agendamento concluido</Title>
      <Description>
        Quarta, dia 06 de Janeiro de 2021 ás 11:00h com Charles Pereira
      </Description>

      <OkButton onPress={() => {}}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;
