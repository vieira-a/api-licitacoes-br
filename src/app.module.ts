import { Module } from '@nestjs/common';
import { ProcessMudule } from './modules/process/process.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), ProcessMudule],
})
export class AppModule {}
