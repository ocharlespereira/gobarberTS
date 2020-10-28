import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';

import ICacheProvider from '../models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  save(key: string, value: string): Promise<void> {}

  recover(key: string): Promise<string> {}

  invalidade(key: string): Promise<void> {}
}
