import { Module } from '@nestjs/common';
import { FetchProcessService } from './services/fetch-process.service';
import { SaveProcessService } from './services/save-process.service';
import { FetchProcessController } from './controllers/fetch-process.controller';
import { ProcessRepository } from './repositories/process.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessEntity } from './entities/process.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProcessEntity])],
  controllers: [FetchProcessController],
  providers: [ProcessRepository, FetchProcessService, SaveProcessService],
})
export class ProcessMudule {}
