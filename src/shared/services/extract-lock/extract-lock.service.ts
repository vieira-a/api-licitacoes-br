import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class ExtractLockService {
  private readonly LOCK_KEY = 'lock:key';
  private readonly lockDuration = 300000;

  constructor(private readonly redisService: RedisService) {}

  async lock(): Promise<boolean> {
    const redisClient = this.redisService.getClient();
    const locked = await redisClient.set(
      this.LOCK_KEY,
      'locked',
      'PX',
      this.lockDuration,
    );
    return locked === 'OK';
  }

  async unlock(): Promise<boolean> {
    const redisClient = this.redisService.getClient();
    const unlocked = await redisClient.del(this.LOCK_KEY);
    return unlocked === 1;
  }

  async isLocked(): Promise<boolean> {
    const redisClient = this.redisService.getClient();
    const lockStatus = await redisClient.get(this.LOCK_KEY);
    return !!lockStatus;
  }
}
