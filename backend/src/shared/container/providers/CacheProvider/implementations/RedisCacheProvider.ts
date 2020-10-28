import Redis, { Redis as RedisClient } from 'ioredis';

import ICacheProvider from '../models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis();
  }

  save(key: string, value: string): Promise<void> {}

  RedisCacheProvider(key: string): Promise<string> {}

  invalidade(key: string): Promise<void> {}
}
