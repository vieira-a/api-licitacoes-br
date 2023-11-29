import { Module } from '@nestjs/common';
import { FetchProcessService } from './services/fetch-process.service';
import { SaveProcessService } from './services/save-process.service';
import { FetchProcessController } from './controllers/fetch-process.controller';
import { ProcessRepository } from './repositories/process.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessEntity } from './entities/process.entity';
import { SaveItemProcessService } from '../process-item/services/save-item-process.service';
import { FetchItemProcessService } from '../process-item/services/fetch-item-process.service';
import { ItemProcessRepository } from '../process-item/repositories/process-item.repository';
import { ItemProcessEntity } from '../process-item/entities/item-process.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProcessEntity, ItemProcessEntity])],
  controllers: [FetchProcessController],
  providers: [
    ProcessRepository,
    FetchProcessService,
    SaveProcessService,
    SaveItemProcessService,
    FetchItemProcessService,
    ItemProcessRepository,
  ],
})
export class ProcessMudule {}
