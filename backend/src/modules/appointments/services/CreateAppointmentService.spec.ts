import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository; //instanciar
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '12412141212',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12412141212');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository; //instanciar
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11); //janeiro comeca com 0 por isso 4 é maio.

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '12412141212',
    });

    expect(createAppointment.execute({
      date: appointmentDate,
      provider_id: '12412141212',
    })).rejects.toBeInstanceOf(AppError); //rejeite, e o erro seja uma instancia de apperror
  });

  // it('should not able to create two appointments on the same time', () => {
  //   expect(1 + 2).toBe(3);
  // });


})
