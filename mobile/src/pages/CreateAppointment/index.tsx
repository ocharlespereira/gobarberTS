import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

import { format } from 'date-fns/esm';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

interface RouteParams {
  providerId: string;
}

const defaults = [
  {
    id: 1,
    name: 'Charles Pereira',
  },
  {
    id: 2,
    name: 'Francisco Costa',
  },
  {
    id: 3,
    name: 'Isaac Barbosa',
  },
];

const defaultData = [
  { hour: '08:00', available: false },
  { hour: '09:00', available: true },
  { hour: '10:00', available: true },
  { hour: '11:00', available: false },
  { hour: '12:00', available: false },
  { hour: '13:00', available: false },
  { hour: '14:00', available: false },
  { hour: '15:00', available: true },
  { hour: '16:00', available: true },
  { hour: '17:00', available: false },
  { hour: '18:00', available: true },
  { hour: '19:00', available: false },
];

const imgDefault =
  'https://avatars2.githubusercontent.com/u/54192694?s=460&u=a0ac6a9b16621a72fd3bfd6bba0c0081c2259d5b&v=4';

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();
  const { goBack } = useNavigation();

  const routeParams = route.params as RouteParams;

  const [availability, setAvailability] = useState<AvailabilityItem[]>(
    defaultData,
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [providers, setProviders] = useState<Provider[]>(defaults);
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId,
  );
  // setSelectedProvider(providerId);

  useEffect(() => {
    api.get('providers').then((res) => {
      setProviders([res.data]);
    });
  }, []);

  useEffect(() => {
    api
      .get(`providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((res) => {
        if (res?.data) {
          setAvailability(res?.data);
        }
      });
  }, [selectedDate, selectedProvider]);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((state) => !state);
  }, []);

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }

      if (date) {
        setSelectedDate(date);
      }
    },
    [],
  );

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={20} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleiros</HeaderTitle>

        <UserAvatar source={{ uri: user?.avatar_url || imgDefault }} />
      </Header>

      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={(provider) => provider?.id}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              onPress={() => handleSelectProvider(provider.id)}
              selected={provider.id === selectedProvider}
            >
              <ProviderAvatar
                source={{ uri: user?.avatar_url || imgDefault }}
              />
              <ProviderName selected={provider.id === selectedProvider}>
                {provider?.name || 'Charles Pereira'}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>

      <Calendar>
        <Title>Escolha a data</Title>

        <OpenDatePickerButton onPress={handleToggleDatePicker}>
          <OpenDatePickerButtonText>
            Selecionar outra data
          </OpenDatePickerButtonText>
        </OpenDatePickerButton>

        {showDatePicker && (
          <DateTimePicker
            mode="date"
            value={selectedDate}
            display="calendar"
            // textColor="#f4ede8"
            onChange={handleDateChanged}
          />
        )}
      </Calendar>

      <Schedule>
        <Title>Escolha o horário</Title>

        <Section>
          <SectionTitle>Manhã</SectionTitle>

          <SectionContent>
            {morningAvailability.map(({ hourFormatted }) => (
              <Hour key={hourFormatted}>
                <HourText>{hourFormatted}</HourText>
              </Hour>
            ))}
          </SectionContent>
        </Section>
        <Section>
          <SectionTitle>Tarde</SectionTitle>

          <SectionContent>
            {afternoonAvailability.map(({ hourFormatted }) => (
              <Hour key={hourFormatted}>
                <HourText>{hourFormatted}</HourText>
              </Hour>
            ))}
          </SectionContent>
        </Section>
      </Schedule>
    </Container>
  );
};

export default CreateAppointment;
