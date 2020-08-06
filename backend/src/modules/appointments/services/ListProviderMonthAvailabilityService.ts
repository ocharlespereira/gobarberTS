import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  month: number;
  year: number;
}

@injectable()
class ListProviderMonthAvailabilityService {
  constructor() {}

  public async execute({ user_id, month, year }: IRequest): Promise<void> {}
}

export default ListProviderMonthAvailabilityService;
