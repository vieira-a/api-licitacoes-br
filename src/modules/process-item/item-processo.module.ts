import { Module } from '@nestjs/common';
import { ItemProcessEntity } from './entities/item-process.entity';
import { FetchItemProcessController } from './controllers/fetch-item-process.controller';
import { FetchItemProcessService } from './services/fetch-item-process.service';
import { SaveItemProcessService } from './services/save-item-process.service';
import { ItemProcessRepository } from './repositories/process-item.repository';
import { ProcessRepository } from '../process/repositories/process.repository';
import { ProcessEntity } from '../process/entities/process.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ItemProcessEntity, ProcessEntity])],
  controllers: [FetchItemProcessController],
  providers: [
    ItemProcessRepository,
    FetchItemProcessService,
    SaveItemProcessService,
    ProcessRepository,
  ],
})
export class ItemProcessoModule {}
