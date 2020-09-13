import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository(); //instanciar
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      user_id: '123123',
      provider_id: '12412141212',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12412141212');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11); //janeiro comeca com 0 por isso 4 é maio.

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '123123',
      provider_id: '12412141212',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '123123',
        provider_id: '12412141212',
      }),
    ).rejects.toBeInstanceOf(AppError); //rejeite, e o erro seja uma instancia de apperror
  });

  it('should not be able to create an appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: '123123',
        provider_id: '12412141212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
