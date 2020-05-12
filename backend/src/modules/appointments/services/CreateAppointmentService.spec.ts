import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointmentService', () => {
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

  // it('should not able to create two appointments on the same time', () => {
  //   expect(1 + 2).toBe(3);
  // });


})
