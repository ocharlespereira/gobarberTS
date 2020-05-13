import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository; //instanciar
    const fakeHashProvider = new FakeHashProvider;
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: 'John Doe', //fulano
      email: 'johndoe@exemple.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be able to create a new user whith same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository; //instanciar
    const fakeHashProvider = new FakeHashProvider;
    const createUser = new CreateUserService(
      fakeUsersRepository, fakeHashProvider
    );

    const user = await createUser.execute({
      name: 'John Doe', //fulano
      email: 'johndoe@exemple.com',
      password: '123456',
    });

    expect(createUser.execute({
      name: 'John Doe', //fulano
      email: 'johndoe@exemple.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });



})
