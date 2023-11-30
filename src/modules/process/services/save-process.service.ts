import { Injectable } from '@nestjs/common';
import { ProcessRepository } from '../repositories/process.repository';
import { FetchProcessService } from './fetch-process.service';
import { SaveItemProcessService } from '../../../modules/process-item/services/save-item-process.service';
import { getDeleteDate } from '../helpers';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SaveProcessService {
  constructor(
    private readonly fetchProcessService: FetchProcessService,
    private readonly processRepository: ProcessRepository,
    private readonly saveItemProcessService: SaveItemProcessService,
  ) {}

  @Cron('0 6,12,18,0 * * *')
  async saveProcess(): Promise<void> {
    const deleteDate = getDeleteDate();
    await this.processRepository.deleteProcessByDate(deleteDate);

    const process = await this.fetchProcessService.fetchProcess();

    for (const item of process) {
      const processAlreadyExists = await this.processRepository.findByCode(
        item.codigoLicitacao,
      );
      if (!processAlreadyExists) {
        await this.processRepository.saveProcess(item);
      } else if (processAlreadyExists) {
        await this.saveItemProcessService.saveItemProcess();
      }
    }
  }
}
