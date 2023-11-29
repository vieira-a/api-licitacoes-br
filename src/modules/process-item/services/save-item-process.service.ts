import { Injectable } from '@nestjs/common';
import { ItemProcessRepository } from '../repositories/process-item.repository';
import { FetchItemProcessService } from './fetch-item-process.service';

@Injectable()
export class SaveItemProcessService {
  constructor(
    private readonly itemProcessRepository: ItemProcessRepository,
    private readonly fetchItemProcessService: FetchItemProcessService,
  ) {}

  async saveItemProcess() {
    const itemProcess = await this.fetchItemProcessService.fetchItemProcess();
    for (const item of itemProcess) {
      const itemAlreadyExists =
        await this.itemProcessRepository.findItemByProcess(
          item.processo,
          item.codigo,
        );
      if (!itemAlreadyExists) {
        await this.itemProcessRepository.saveItemProcess(item);
      }
    }
  }
}
