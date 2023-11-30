import { Module } from '@nestjs/common';
import { ItemProcessEntity } from './entities/item-process.entity';
import {
  FetchItemProcessController,
  LoadItemProcessController,
} from './controllers';
import {
  FetchItemProcessService,
  SaveItemProcessService,
  LoadItemProcessService,
} from './services';
import { ItemProcessRepository } from './repositories/process-item.repository';
import { ProcessRepository } from '../process/repositories/process.repository';
import { ProcessEntity } from '../process/entities/process.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ItemProcessEntity, ProcessEntity])],
  controllers: [FetchItemProcessController, LoadItemProcessController],
  providers: [
    ItemProcessRepository,
    FetchItemProcessService,
    SaveItemProcessService,
    LoadItemProcessService,
    ProcessRepository,
  ],
})
export class ItemProcessoModule {}
