import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { isToday, format } from 'date-fns';
import { parseISO } from 'date-fns/esm';
import ptBR from 'date-fns/locale/pt-BR';
import { FiClock, FiPower } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Calendar,
  Appointment,
} from './styles';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const imgDefault =
  'https://avatars2.githubusercontent.com/u/54192694?s=460&u=a0ac6a9b16621a72fd3bfd6bba0c0081c2259d5b&v=4';

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const { user, signOut } = useAuth();

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const handleDateChange = useCallback((day: Date, modifers: DayModifiers) => {
    if (modifers.available) {
      setSelectedDate(day);
    }
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${user?.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then((response) => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user?.id]);

  useEffect(() => {
    api
      .get<Appointment[]>('/appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        const appointmentsFormatted = response.data.map((appointment) => {
          return {
            ...appointment,
            hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
          };
        });

        setAppointments(appointmentsFormatted);
      });
  }, [selectedDate]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter((monthDay) => monthDay?.available === false)
      .map((monthDay) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay?.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]); //memorizar valor especifico e dizer quando quer q seja recarregado o valor

  const selectedateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', { locale: ptBR });
  }, [selectedDate]);

  const morningAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return parseISO(appointment.date).getHours() < 12;
    });
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return parseISO(appointment.date).getHours() >= 12;
    });
  }, [appointments]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Gobarber" />

          <Profile>
            <img src={user?.avatar_url || imgDefault} alt={user?.name} />
            <div>
              <span>Bem-vindo</span>
              <strong>{user?.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          {isToday(selectedDate) && (
            <NextAppointment>
              <strong>Agendaemento a seguir</strong>
              <div>
                <img src={imgDefault} alt="Charles Pereira" />

                <strong>Charles Pereira</strong>

                <span>
                  <FiClock />
                  08:00
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Manhã</strong>

            {morningAppointments.map((data) => (
              <Appointment>
                <span>
                  <FiClock />
                  {data.hourFormatted || '08:00'}
                </span>
                <div>
                  <img
                    src={data?.user?.avatar_url || imgDefault}
                    alt={data?.user?.name || 'Charles Pereira'}
                  />

                  <strong>{data?.user?.name || 'Charles Pereira'}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
          <Section>
            <strong>Tarde</strong>

            {afternoonAppointments.map((data) => (
              <Appointment>
                <span>
                  <FiClock />
                  {data.hourFormatted || '08:00'}
                </span>
                <div>
                  <img
                    src={data?.user?.avatar_url || imgDefault}
                    alt={data?.user?.name || 'Charles Pereira'}
                  />

                  <strong>{data?.user?.name || 'Charles Pereira'}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
            onDayClick={handleDateChange}
            selectedDays={selectedDate}
            onMonthChange={handleMonthChange}
            months={months}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
