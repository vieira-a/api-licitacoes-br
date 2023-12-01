import { Module } from '@nestjs/common';
import { ProcessMudule } from './modules/process/process.module';
import { ItemProcessoModule } from './modules/process-item/item-processo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisModule } from './shared/services/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    ProcessMudule,
    ItemProcessoModule,
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({ ttl: 5 * 60000 }),
      }),
      isGlobal: true,
    }),
    RedisModule,
  ],
})
export class AppModule {}
