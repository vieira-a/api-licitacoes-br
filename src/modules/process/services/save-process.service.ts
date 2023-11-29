import { Injectable } from '@nestjs/common';
import { ProcessRepository } from '../repositories/process.repository';
import { FetchProcessService } from './fetch-process.service';
import { SaveItemProcessService } from '../../../modules/process-item/services/save-item-process.service';

@Injectable()
export class SaveProcessService {
  constructor(
    private readonly fetchProcessService: FetchProcessService,
    private readonly processRepository: ProcessRepository,
    private readonly saveItemProcessService: SaveItemProcessService,
  ) {}

  async saveProcess(): Promise<void> {
    const currentDate = new Date();
    const deleteDate = new Date();
    deleteDate.setDate(currentDate.getDate() - 1);

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
