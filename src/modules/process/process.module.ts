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
  ],
})
export class ProcessMudule {}
