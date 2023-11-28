import { Module } from '@nestjs/common';
import { ProcessMudule } from './modules/process/process.module';
import { ItemProcessoModule } from './modules/process-item/item-processo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ProcessMudule,
    ItemProcessoModule,
  ],
})
export class AppModule {}
