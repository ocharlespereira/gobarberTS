import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUSerTokensRepository {
  generate(user_id: string): Promise<UserToken>;
}
