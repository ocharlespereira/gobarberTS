import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository(); /

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able show the profile', async () => {
   const user = await fakeUsersRepository.create({
      name: 'John Doe', //fulano
      email: 'johndoe@exemple.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    await expect(profile.name).toBe('John Doe');
    await expect(profile.email).toBe('johndoe@exemple.com');
  });

});
