import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessEntity } from './entities/process.entity';
import { ItemProcessEntity } from '../process-item/entities/item-process.entity';
import { ProcessRepository } from './repositories/process.repository';
import { ItemProcessRepository } from '../process-item/repositories/process-item.repository';
import {
  FetchProcessService,
  SaveProcessService,
  LoadProcessService,
} from './services';
import {
  FetchItemProcessService,
  SaveItemProcessService,
} from '../process-item/services';
import { FetchProcessController, LoadProcessController } from './controllers';
import { ExtractLockService } from '../../shared/services/extract-lock/extract-lock.service';
import { RedisService } from '../../shared/services/redis/redis.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProcessEntity, ItemProcessEntity])],
  controllers: [FetchProcessController, LoadProcessController],
  providers: [
    ProcessRepository,
    FetchProcessService,
    LoadProcessService,
    SaveProcessService,
    SaveItemProcessService,
    FetchItemProcessService,
    ItemProcessRepository,
    ExtractLockService,
    RedisService,
  ],
})
export class ProcessMudule {}
